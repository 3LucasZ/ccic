import { Image as ExpoImage } from "expo-image";
import { cssInterop } from "nativewind";
import React from "react";

function ImageImpl({ ...props }: React.ComponentProps<typeof ExpoImage>) {
  return <ExpoImage {...props} />;
}

export const Image = cssInterop(ImageImpl, {
  className: "style",
});
