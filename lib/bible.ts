import { SQLiteDatabase } from "expo-sqlite";

export async function getBibleText(references: string, db: SQLiteDatabase) {
    const q = generateBibleQuery(references);
    const passageTextQuery = await db.getAllAsync(q);
    const stringArray: string[] = passageTextQuery.map(item => item.text);
    const singleString: string = stringArray.join("");
    return singleString
}

/**
 * Converts a string of Bible references into a SQL query for an SQLite database.
 * The function handles single verses, verse ranges, full chapters, and multi-chapter ranges.
 *
 * @param references - A comma-separated string of Bible references (e.g., "Matthew 17:1-13, Matthew 18:1-19:1, Romans 12, Romans 13:3").
 * @returns A complete SQL query string.
 */
export function generateBibleQuery(references: string): string {
  // Split the input string by commas to get individual references
  const individualRefs = references.split(',').map(ref => ref.trim()).filter(ref => ref.length > 0);

  const conditions: string[] = [];

  for (const ref of individualRefs) {
    // Find the last space to separate the book name from the chapter/verse part
    const lastSpaceIndex = ref.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
      console.error(`Invalid reference format: ${ref}`);
      continue;
    }

    let bookName = ref.substring(0, lastSpaceIndex).trim();
    const chapterVersePart = ref.substring(lastSpaceIndex + 1).trim();

    // Check for a colon to see if it's a specific verse or verse range
    if (chapterVersePart.includes(':')) {
      // It's a chapter and verse reference
      const [startChapter, versePart] = chapterVersePart.split(':');
      let startVerse = parseInt(versePart);
      let endVerse = startVerse;

      // Check if it's a verse range (e.g., 17:1-13)
      if (versePart.includes('-')) {
        const [start, end] = versePart.split('-').map(v => parseInt(v));
        startVerse = start;
        endVerse = end;
        conditions.push(
          `(b.name = '${bookName}' AND bv.chapter = ${startChapter} AND bv.verse BETWEEN ${startVerse} AND ${endVerse})`
        );
      } else {
        // It's a single verse (e.g., 13:3)
        conditions.push(
          `(b.name = '${bookName}' AND bv.chapter = ${startChapter} AND bv.verse = ${startVerse})`
        );
      }
    } else if (chapterVersePart.includes('-')) {
      // It's a chapter-to-chapter range with verses (e.g., 18:1-19:1)
      const [start, end] = chapterVersePart.split('-');
      const [startChapter, startVerse] = start.split(':').map(Number);
      const [endChapter, endVerse] = end.split(':').map(Number);

      // Construct a precise WHERE clause for the chapter range
      conditions.push(
        `(b.name = '${bookName}' AND (` +
        `(bv.chapter = ${startChapter} AND bv.verse >= ${startVerse}) OR ` +
        `(bv.chapter = ${endChapter} AND bv.verse <= ${endVerse}) OR ` +
        `(bv.chapter > ${startChapter} AND bv.chapter < ${endChapter})` +
        `))`
      );
    } else {
      // It's a full chapter reference (e.g., 12)
      const chapter = parseInt(chapterVersePart);
      conditions.push(
        `(b.name = '${bookName}' AND bv.chapter = ${chapter})`
      );
    }
  }

  // Combine all conditions with 'OR'
  const whereClause = conditions.join(' OR ');

  // Construct the final query with a JOIN clause
  return `SELECT bv.text FROM ASV_verses AS bv JOIN ASV_books AS b ON bv.book_id = b.id WHERE ${whereClause};`;
}
