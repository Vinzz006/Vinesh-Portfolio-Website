import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description?: string;
}

export function useDocumentMeta({ title, description }: MetaOptions) {
  useEffect(() => {
    const formattedTitle = title
      ? `${title} | Vinesh Shanmugam`
      : 'Vinesh Shanmugam | ECE Student · Embedded AI & IoT';

    document.title = formattedTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Update OG & Twitter descriptions
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', formattedTitle);
  }, [title, description]);
}
