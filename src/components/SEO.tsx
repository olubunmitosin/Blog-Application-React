import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  metaDescription?: string | undefined;
  metaKeywords?: string | undefined;
}

const Seo = ({ title, metaDescription, metaKeywords }: SeoProps) => {
  return (
    <Helmet>
      <title>{title ? `${title} | Application` : "Application"}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta
        property="og:title"
        content={title ? `${title} | Template` : "Template"}
      />
    </Helmet>
  );
};

export default Seo;
