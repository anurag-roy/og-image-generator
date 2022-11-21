import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function () {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        children: 'hello, world',
        style: { color: 'black' },
      },
    },
    {
      width: 1200,
      height: 600,
    }
  );
}
