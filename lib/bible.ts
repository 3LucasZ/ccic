import { SQLiteDatabase } from "expo-sqlite";

export function getBibleTextSync(references: string, db: SQLiteDatabase) {
  var q;
  try {
    q = generateBibleQuery(references);
  } catch {
    return "";
  }
  const passageTextQuery = db.getAllSync(q);
  const stringArray: string[] = passageTextQuery.map((item) => item.text);
  const singleString: string = stringArray.join("");
  return singleString;
}

export async function getBibleTextAsync(
  references: string,
  db: SQLiteDatabase
) {
  var q;
  try {
    q = generateBibleQuery(references);
  } catch {
    return "";
  }
  const passageTextQuery = await db.getAllAsync(q);
  const stringArray: string[] = passageTextQuery.map((item) => item.text);
  const singleString: string = stringArray.join("");
  return singleString;
}

/**
 * Converts a string of Bible references into a SQL query for an SQLite database.
 * The function handles single verses, verse ranges, full chapters, and multi-chapter ranges.
 *
 * @param references - A comma-separated string of Bible references (e.g., "Matthew 17:1-13, Matthew 18:1-19:1, Romans 12, Romans 13:3").
 * @returns A complete SQL query string.
 */
function generateBibleQuery(references: string): string {
  // Split the input string by commas to get individual references
  const individualRefs = references
    .split(",")
    .map((ref) => ref.trim())
    .filter((ref) => ref.length > 0);

  const conditions: string[] = [];

  for (const ref of individualRefs) {
    // Find the last space to separate the book name from the chapter/verse part
    const lastSpaceIndex = ref.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      throw `Invalid reference format: ${ref}`;
    }
    let bookName = ref.substring(0, lastSpaceIndex).trim();
    const chapterVerse = ref.substring(lastSpaceIndex + 1).trim();

    // Case: has "-" => range of verses
    if (chapterVerse.includes("-")) {
      var [chapterVerse1, chapterVerse2] = chapterVerse.split("-");
      var [chapter1, verse1] = chapterVerse1.split(":");
      // if chapter2 is not specified, assume its the same as chapter1
      var [chapter2, verse2] = chapterVerse2.includes(":")
        ? chapterVerse2.split(":")
        : [chapter1, chapterVerse2];
      conditions.push(
        `(b.name = '${bookName}' AND (` +
          `(bv.chapter = ${chapter1} AND bv.verse >= ${verse1}) OR ` +
          `(bv.chapter = ${chapter2} AND bv.verse <= ${verse2}) OR ` +
          `(bv.chapter > ${chapter1} AND bv.chapter < ${chapter2})` +
          `))`
      );
    } else {
      // Case: single verse
      if (chapterVerse.includes(":")) {
        const [chapter, verse] = chapterVerse.split(":");
        conditions.push(
          `(b.name = '${bookName}' AND bv.chapter = ${chapter} AND bv.verse = ${verse})`
        );
      }
      // Case: entire chapter
      else {
        conditions.push(
          `(b.name = '${bookName}' AND bv.chapter = ${chapterVerse})`
        );
      }
    }
  }

  // Combine all conditions with 'OR'
  const whereClause = conditions.join(" OR ");
  // Construct the final query with a JOIN clause
  const query = `SELECT bv.text FROM ASV_verses AS bv JOIN ASV_books AS b ON bv.book_id = b.id WHERE ${whereClause};`;
  console.log(query);
  return query;
}

function isBibleReferenceFormat(text: string): boolean {
  try {
    generateBibleQuery(text);
    return true;
  } catch (e) {
    return false;
  }
}
