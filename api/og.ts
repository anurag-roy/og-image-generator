import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

function arrayBufferToBase64Url(buffer: ArrayBuffer, mimeType: string) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64content = btoa(binary);
  return `data:${mimeType};base64,` + base64content;
}

export default async function (request: Request) {
  const { origin, searchParams } = new URL(request.url);

  const [sFontData, cdFontData, avFontData, memojiUrl] = await Promise.all([
    fetch(`${origin}/assets/Satoshi.ttf`).then((res) => res.arrayBuffer()),
    fetch(`${origin}/assets/ClashDisplay.ttf`).then((res) => res.arrayBuffer()),
    fetch(`${origin}/assets/AloeVera.ttf`).then((res) => res.arrayBuffer()),
    fetch(`${origin}/assets/memoji.png`)
      .then((res) => res.arrayBuffer())
      .then((buffer) => arrayBufferToBase64Url(buffer, 'image/png')),
  ]);

  const title = searchParams.has('title')
    ? searchParams.get('title')?.slice(0, 30)
    : 'Hello, World!';

  const description = searchParams.has('description')
    ? searchParams.get('description')?.slice(0, 100)
    : '';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        tw: 'h-full w-full px-20 py-16 bg-rose-200 flex flex-col justify-between',
        children: [
          {
            type: 'h1',
            props: {
              tw: 'text-8xl leading-none',
              style: { fontFamily: 'ClashDisplay' },
              children: title,
            },
          },
          {
            type: 'p',
            props: {
              tw: 'mb-16 text-5xl text-gray-900 leading-tight',
              style: { fontFamily: 'Satoshi' },
              children: description,
            },
          },
          {
            type: 'div',
            props: {
              tw: 'w-full flex flex-row items-center',
              children: [
                {
                  type: 'img',
                  props: {
                    src: memojiUrl,
                    height: '56px',
                    width: '56px',
                    tw: 'mr-2 bg-rose-300 rounded-full',
                  },
                },
                {
                  type: 'span',
                  props: {
                    tw: 'text-5xl text-rose-600 mr-auto',
                    style: { fontFamily: 'AloeVera' },
                    children: 'anuragroy.dev',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi',
          data: sFontData,
        },
        {
          name: 'ClashDisplay',
          data: cdFontData,
        },
        {
          name: 'AloeVera',
          data: avFontData,
        },
      ],
    }
  );
}
