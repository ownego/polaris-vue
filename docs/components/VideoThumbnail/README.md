---
layout: doc
title: Video thumbnail
category: Images and icons
examples:
  - fileName: Default.vue
    title: Default
    description: Use as a play button for a video player within a media card.
  - fileName: VideoThumbnailWithProgress.vue
    title: With progress
    description: Use to indicate the video’s play progress in relation to its duration.
---

# {{ $frontmatter.title }}

<Lede>

{{ $frontmatter.description }}

</Lede>

<Examples>

<<< ./[examples]

</Examples>

## Props

<PropsTable />

<div style="font-size: 0.8125rem">

## Best practices

Video thumbnails should:

- Be used with a media card
- Use an image that communicates the subject of the video
- Include a video timestamp
- Capture an image from the video to give a preview of the video content
- Be cropped to a 16:9 aspect ratio
- Be centered on the subject and avoid cropping of important details, like a person’s head

---

## Required components

- The video thumbnail should be wrapped in the [media card](/components/MediaCard) component.

---

## Related components

- To present a small visual anchor for an object, [use the thumbnail component](/components/Thumbnail)

---

## Accessibility

Images included in video thumbnails are implemented as decorative background images so that they’re skipped by screen readers.

The play button is keyboard accessible and the `aria-label` includes a timestamp when the `videoLength` prop is set. For example, an 80 second video reads as “Play video of length 1 minute and 20 seconds”. If no `videoLength` prop is provided, the default label reads “Play video”.

</div>
