import React, { useState, useEffect } from "react";

interface BiliImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  transformUrl?: boolean;
}

/**
 * 专门用于处理B站图片的组件
 * 解决无法正常加载的问题
 */
const BiliImage: React.FC<BiliImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  transformUrl = true,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  // 处理图片加载错误
  const handleError = () => {
    if (!isError) {
      // 如果是B站的图片链接，尝试使用代理或转换URL
      if (transformUrl && imgSrc && (imgSrc.includes("hdslb.com") || imgSrc.includes("biliimg.com"))) {
        // 1. 尝试将http换成https
        if (imgSrc.startsWith("http://")) {
          const httpsUrl = imgSrc.replace("http://", "https://");
          setImgSrc(httpsUrl);
        } 
        // 2. 如果是archive.biliimg.com，尝试改为i0.hdslb.com
        else if (imgSrc.includes("archive.biliimg.com")) {
          const transformedUrl = imgSrc.replace("archive.biliimg.com", "i0.hdslb.com");
          setImgSrc(transformedUrl);
        }
        // 3. 如果上面都不起作用，使用fallback
        else {
          setImgSrc(fallbackSrc || "/default-image.png");
          setIsError(true);
        }
      } else {
        // 非B站图片，直接使用fallback
        setImgSrc(fallbackSrc || "/default-image.png");
        setIsError(true);
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || "图片"}
      className={className}
      onError={handleError}
      loading="lazy"
      {...rest}
    />
  );
};

export default BiliImage; 