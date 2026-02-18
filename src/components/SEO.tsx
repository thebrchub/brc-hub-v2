import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
  const siteName = "BRC Hub LLP";
  const defaultImage = "/og-image.jpg"; // You need to add a generic banner in your public folder
  const siteUrl = "https://thebrchub.tech"; // Your actual domain
  
  const finalImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* 1. Standard HTML Tags */}
      <title>{title} | {siteName}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalUrl} />

      {/* 2. Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* 3. Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};