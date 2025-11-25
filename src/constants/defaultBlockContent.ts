import { BlockData } from "@/contexts/EmailBuilderContext";

export function getDefaultContent(
  type: BlockData["type"]
): Record<string, any> {
  switch (type) {
    case "image-text":
      return {
        imageUrl: "https://dummyimage.com/1280x720",
        imageLinkUrl: "https://www.example.com",
        headline: "Headline",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        buttonText: "Please click me",
        buttonUrl: "https://www.example.com/",
      };
    case "banner":
      return {
        imageUrl: "https://dummyimage.com/1280x720",
        linkUrl: "https://www.example.com/",
        altText: "Banner image [description]",
      };
    case "headline":
      return {
        text: "Lorem Ipsum is simply dummy text",
      };
    case "twin-teaser":
      return {
        leftImageUrl: "https://dummyimage.com/1280x720",
        leftImageLinkUrl: "https://www.example.com",
        leftHeadline: "Headline",
        leftText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        leftButtonText: "Please click me",
        leftButtonUrl: "https://www.example.com/",
        rightImageUrl: "https://dummyimage.com/1280x720",
        rightImageLinkUrl: "https://www.example.com",
        rightHeadline: "Headline",
        rightText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        rightButtonText: "Please click me",
        rightButtonUrl: "https://www.example.com/",
      };
    case "paragraph":
      return {
        greeting: "Hello,",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        buttonText: "Please click me",
        buttonUrl: "https://www.example.com/",
      };
    default:
      return {};
  }
}
