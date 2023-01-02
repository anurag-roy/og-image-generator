# OG Image Generator

This is an example of generating dynamic Open Graph (OG) images on the edge using `@vercel/og`. This example does not use Next.js and can be deployed as a single edge function on Vercel.

## Example

![og](https://user-images.githubusercontent.com/53750093/210263101-18610f1e-6c43-46ca-bd28-d07edbb61ae8.png)

The above image was generated with the following [endpoint](https://og.anuragroy.dev/api?title=TailwindCSS%20with%20@next/font&description=Here%27s%20how%20to%20integrate%20the%20new%20@next/font%20in%20Next.js%2013%20with%20TailwindCSS):
```
/api?title=TailwindCSS%20with%20@next/font&description=Here%27s%20how%20to%20integrate%20the%20new%20@next/font%20in%20Next.js%2013%20with%20TailwindCSS
```

### Working

- Data passing through query params
- Custom font loading
- Image loading
- Emojis

### Things not working

- Wasn't able to make this work using JSX, so using the [alternate React-elements-like objects](https://github.com/vercel/satori#use-without-jsx), which feels very verbose and clunky.
- The current way of loading "local" fonts also feels like a hack, `import.meta.url` is not working even after setting the module to `esnext`.
- No dev environment to test this, `vercel dev` is not working.

Hopefully all of the above will be fixed with future releases of `@vercel/og`

### Acknowledgements

- Vercel for their amazing work on the library and all the [examples](https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples)
- [alvar.dev](https://alvar.dev/) for the OG card design
