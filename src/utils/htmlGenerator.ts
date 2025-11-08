import { BlockData } from "@/contexts/EmailBuilderContext";

const MASTER_TEMPLATE_START = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
<title>RE-BLOCKS</title>
<style>
:root {
  color-scheme: light dark;
  supported-color-schemes: light dark;
}
@media (prefers-color-scheme: dark) {
  .white-line {
    border: 1px solid #ffffff !important;
  }
  [data-ogsc] .white-line {
    border: 1px solid #ffffff !important;
  }
  .dark-bgd {
    background-color: #282828 !important;
  }
  [data-ogsc] .dark-bgd {
    background-color: #282828 !important;
  }
  .dark-font {
    color: #ffffff !important;
  }
  [data-ogsc] .dark-font {
    color: #ffffff !important;
  }
  .dark-button {
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
    background-color: #282828 !important;
  }
  [data-ogsc] .dark-button {
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
    background-color: #282828 !important;
  }
  .white-btn {
    border: 1px solid #ffffff !important;
    color: #003e64 !important;
    background-color: #ffffff !important;
  }
  [data-ogsc] .white-btn {
    border: 1px solid #ffffff !important;
    color: #003e64 !important;
    background-color: #ffffff !important;
  }
  .blue-btn {
    border: 1px solid #ffffff !important;
    color: #003e64 !important;
    background-color: #ffffff !important;
  }
  [data-ogsc] .blue-btn {
    border: 1px solid #ffffff !important;
    color: #003e64 !important;
    background-color: #ffffff !important;
  }
}
</style>
<style type="text/css">
body {
  width: 100% !important;
  margin: 0;
  padding: 0;
  background-color: #efeff0;
  font-family: Arial, Helvetica, sans-serif !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
  font-size: inherit !important;
  font-family: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}
img {
  border: 0;
}
p {
  padding: 0 !important;
  margin: 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-decoration: none;
}
a:visited {
  color: #007BC0 !important;
}
.desktop-hide {
  display: none !important;
  visibility: hidden !important;
  line-height: 0 !important;
  font-size: 0 !important;
  width: 0 !important;
  mso-hide: all !important;
  max-height: 0px !important;
  overflow: hidden !important;
  height: 0 !important;
}
.wrapper {
  width: 100% !important;
  table-layout: fixed !important;
  background-color: #efeff0 !important;
}
.webkit {
  max-width: 640px !important;
  background-color: #ffffff !important;
  display: block !important;
  margin: 0 auto !important;
  width: 100%;
}
.outer {
  margin: 0 auto !important;
  width: 100%;
  max-width: 640px !important;
  border-spacing: 0 !important;
  display: block !important;
}
</style>
<style type="text/css">
@media only screen and (max-width: 640px) {
  .logo {
    height: 30px !important;
  }
  .online {
    text-transform: none !important;
    font-size: 12px !important;
    font-weight: bold;
    text-decoration: none !important;
  }
  .sub-text {
    font-size: 12px !important;
    line-height: 16px !important;
  }
  .block-vertical-spacing {
    padding-bottom: 48px !important;
  }
  .responsive-img {
    display: block !important;
  }
  .show {
    display: block !important;
    height: auto !important;
    visibility: visible !important;
    max-height: auto !important;
    line-height: normal !important;
    width: 100% !important;
  }
  .hide {
    display: none !important;
    visibility: hidden !important;
    line-height: 0 !important;
    font-size: 0 !important;
    width: 0 !important;
    mso-hide: all !important;
    max-height: 0px !important;
    overflow: hidden !important;
    height: 0 !important;
  }
  .templateColumnContainer {
    display: block !important;
    min-width: 100% !important;
  }
  .mobile-center {
    margin: 0 auto !important;
  }
  .text-align {
    text-align: center !important;
  }
  .width-100 {
    width: 100% !important;
  }
  .width-95 {
    width: 95% !important;
  }
  .image-height-160 {
    height: 160px !important;
  }
  .padding-bottom-36 {
    padding-bottom: 36px !important;
  }
  .padding-bottom-20 {
    padding-top: 0 !important;
    padding-bottom: 20px !important;
  }
  .padding-bottom-24 {
    padding-top: 0 !important;
    padding-bottom: 24px !important;
  }
  .dir-rtl {
    direction: rtl;
  }
  .product-responsive-img {
    display: block !important;
    width: 100%;
    height: auto;
  }
}
</style>
<style type="text/css">
@media only screen and (max-width: 480px) {
  .width-70 {
    width: 71% !important;
  }
  .width-30 {
    width: 29% !important;
  }
  .width-5 {
    width: 5% !important;
  }
}
</style>
</head>
<body>`;

const HEADER = `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #ffffff !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" role="presentation">
      <tbody>
        <tr><td>
          <table border="0" align="center" cellpadding="0" cellspacing="0" width="640" bgcolor="#FFFFFF" class="width-100 dark-bgd">
            <tbody>
              <tr><td>
                <table border="0" bgcolor="#003b6a" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #003b6a;">
                  <tbody>
                    <tr><td bgcolor="#003b6a" height="24" style="background-color: #003b6a;"></td></tr>
                    <tr><td>
                      <table border="0" bgcolor="#003b6a" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tbody>
                          <tr>
                            <td align="center" width="50%" valign="middle" style="background-color: #003b6a;">
                              <table border="0" bgcolor="#003b6a" cellpadding="0" cellspacing="0" style="width: 100%;">
                                <tbody>
                                  <tr>
                                    <td bgcolor="#003b6a" width="16"></td>
                                    <td align="left" bgcolor="#003b6a" valign="middle">
                                      <a href="https://www.example.com/" target="_blank">
                                        <img src="https://dummyimage.com/120x40/" border="0" alt="Logo" height="40" style="height: 40px;">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td align="center" bgcolor="#003b6a" width="50%" valign="middle">
                              <table border="0" cellpadding="0" cellspacing="0" bgcolor="#003b6a" style="width: 100%;">
                                <tbody>
                                  <tr>
                                    <td align="right" bgcolor="#003b6a" valign="middle">
                                      <p style="font-size: 24px; line-height: 30px; font-weight: 900; text-transform: uppercase; color: #ffffff; font-family: Arial, Helvetica, sans-serif; margin: 0;">PRO NEWS</p>
                                    </td>
                                    <td bgcolor="#003b6a" width="16"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td></tr>
                    <tr><td bgcolor="#003b6a" height="32"></td></tr>
                  </tbody>
                </table>
              </td></tr>
            </tbody>
          </table>
        </td></tr>
      </tbody>
    </table>
  </div>
</center>`;

const FOOTER = `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #003b6a !important; display: block !important; margin: 0; width: 100%;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" role="presentation">
      <tbody>
        <tr><td>
          <table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #003b6a;" class="width-100 dark-bgd">
            <tbody>
              <tr><td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#003b6a" style="width: 100%;">
                  <tbody>
                    <tr>
                      <td align="center" style="padding: 32px 0px 16px;">
                        <p style="font-size: 16px; line-height: 24px; color: #ffffff; font-weight: 900; margin: 0;">Follow us</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 0px 0px 24px;">
                        <table cellspacing="0" cellpadding="0" border="0" align="center">
                          <tbody>
                            <tr>
                              <td align="center" width="56">
                                <a href="https://www.example.com/" target="_blank">
                                  <img src="https://dummyimage.com/40x40/" alt="Facebook" height="40" style="max-height: 40px;">
                                </a>
                              </td>
                              <td align="center" width="56">
                                <a href="https://www.example.com/" target="_blank">
                                  <img src="https://dummyimage.com/40x40/" alt="Instagram" height="40" style="max-height: 40px;">
                                </a>
                              </td>
                              <td align="center" width="56">
                                <a href="https://www.example.com/" target="_blank">
                                  <img src="https://dummyimage.com/40x40/" alt="Youtube" height="40" style="max-height: 40px;">
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td></tr>
            </tbody>
          </table>
        </td></tr>
      </tbody>
    </table>
  </div>
</center>`;

const MASTER_TEMPLATE_END = `</body></html>`;

function generateBlockHTML(block: BlockData): string {
  const blockId = block.id;
  let blockHTML = "";
  
  switch (block.type) {
    case "image-text":
      blockHTML = generateImageTextBlock(block.content);
      break;
    case "banner":
      blockHTML = generateBannerBlock(block.content);
      break;
    case "headline":
      blockHTML = generateHeadlineBlock(block.content);
      break;
    case "twin-teaser":
      blockHTML = generateTwinTeaserBlock(block.content);
      break;
    case "paragraph":
      blockHTML = generateParagraphBlock(block.content);
      break;
    default:
      return "";
  }
  
  // Add data-block-id attribute to the outer center element
  return blockHTML.replace(
    /<center role="main"/g,
    `<center role="main" data-block-id="${blockId}"`
  );
}

function generateImageTextBlock(content: any): string {
  const imageLinkUrl = content.imageLinkUrl || content.buttonUrl || "https://www.example.com";
  const buttonUrl = content.buttonUrl || "https://www.example.com/";
  const imageUrl = content.imageUrl || "https://dummyimage.com/1280x720";
  const headline = content.headline || "Headline";
  const text = content.text || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const buttonText = content.buttonText || "Please click me";
  
  return `<center role="main" class="wrapper" style="width: 100%; background-color: #efeff0;">
  <div class="webkit" style="width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0; margin: 0;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
      <tbody>
        <tr>
          <td>
            <table dir="ltr" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" width="640" align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff !important; width: 640px;" class="width-100 dark-bgd" role="presentation">
              <tbody>
                <tr>
                  <td width="16" class="dark-bgd"></td>
                  <td style="padding: 0 0 32px 0;" class="block-vertical-spacing dark-bgd">
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="border-spacing: 0; width: 100%;" class="dark-bgd" role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="border-spacing: 0; width: 100%;" class="dark-bgd" role="presentation">
                              <tbody>
                                <tr>
                                  <td width="296" valign="top" style="font-size: 0; line-height: 0;" class="templateColumnContainer padding-bottom-36 dark-bgd" dir="ltr">
                                    <a rel="noopener noreferrer" href="${imageLinkUrl}" target="_blank" aria-label=" Image [description]">
                                      <img class="responsiveIMG" src="${imageUrl}" alt="Image" title="Image" width="296" height="auto" style="opacity: 1; width: 100%;">
                                    </a>
                                  </td>
                                  <td width="16" class="hide"></td>
                                  <td width="296" valign="top" style="text-align: left; padding: 0;" class="templateColumnContainer dark-bgd" dir="ltr">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 100%;" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td style="padding: 0 0 18px 0;">
                                            <h5 translate="yes" class="dark-font" style="font-size: 18px; line-height: 24px; color: #003b6a; text-transform: uppercase; letter-spacing: -0.02em; font-weight: 900; font-family: 'Arial Black', Arial, Helvetica, sans-serif !important; text-align: left; padding: 0; margin: 0;">${headline}</h5>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 0 0 24px 0;">
                                            <p role="paragraph" translate="yes" style="font-size: 16px; line-height: 24px; font-family: Arial, Helvetica, sans-serif; padding: 0; margin: 0;">${text}</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style="padding: 0 0 24px 0;">
                                            <a href="${buttonUrl}" class="dark-button" style="font-size: 16px; line-height: 24px; font-family: Arial, Helvetica, sans-serif !important; text-decoration: none; padding: 13px 16px; color: #ffffff; display: inline-block; background-color: #003b6a; mso-padding-alt: 0;" aria-label="Please click me to read more about [headline]">
                                              <!--[if mso]>
                                                <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 20pt;">&nbsp;</i>
                                              <![endif]-->
                                              <span translate="yes" style="mso-text-raise: 10pt; color: #ffffff;">${buttonText}</span>
                                              <!--[if mso]>
                                                <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
                                              <![endif]-->
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td width="16" class="dark-bgd"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</center>`;
}

function generateBannerBlock(content: any): string {
  const linkUrl = content.linkUrl || "https://www.example.com/";
  const imageUrl = content.imageUrl || "https://dummyimage.com/1280x720";
  const altText = content.altText || "Banner image [description]";
  
  return `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #efeff0 !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
      <tbody>
        <tr>
          <td>
            <table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; background-color: #ffffff;" class="width-100 dark-bgd" role="presentation">
              <tbody>
                <tr>
                  <td style="padding: 0 0 32px 0;" class="block-vertical-spacing">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; width: 100%;" role="presentation">
                      <tbody>
                        <tr>
                          <td style="font-size: 0; line-height: 0; display: block;">
                            <a rel="noopener noreferrer" href="${linkUrl}" target="_blank" aria-label="${altText}">
                              <img class="responsive-img" src="${imageUrl}" alt="${altText}" title="${altText}" width="640" style="border: 0; max-width: 100%;">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</center>`;
}

function generateHeadlineBlock(content: any): string {
  const text = content.text || "Lorem Ipsum is simply dummy text";
  
  return `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #ffffff !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
      <tbody>
        <tr>
          <td>
            <table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; background-color: #ffffff;" class="width-100 dark-bgd" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; width: 100%;" role="presentation">
                      <tbody>
                        <tr>
                          <td width="640" style="padding: 32px 0; background-color: #ffffff; width: 100%;" class="block-vertical-spacing dark-bgd width-100">
                            <table style="background-color: #ffffff; text-align: center; width: 640px;" width="640" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" align="center" class="width-100 dark-bgd" role="presentation">
                              <tbody>
                                <tr>
                                  <td bgcolor="#ffffff" width="24" style="width: 24px; height: 0; line-height: 0;" class="dark-bgd"></td>
                                  <td>
                                    <h2 translate="yes" class="dark-font" style="font-size: 36px; line-height: 44px; color: #003b6a; font-family: 'Arial Black', Arial, Helvetica, sans-serif !important; font-weight: 900; padding: 0; margin: 0; text-transform: uppercase; letter-spacing: -0.05em;">
                                      ${text}&nbsp;
                                    </h2>
                                  </td>
                                  <td bgcolor="#ffffff" width="24" class="dark-bgd"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</center>`;
}

function generateTwinTeaserBlock(content: any): string {
  const leftImageUrl = content.leftImageUrl || "https://dummyimage.com/1280x720";
  const leftImageLinkUrl = content.leftImageLinkUrl || "https://www.example.com";
  const leftHeadline = content.leftHeadline || "Headline";
  const leftText = content.leftText || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const leftButtonText = content.leftButtonText || "Please click me";
  const leftButtonUrl = content.leftButtonUrl || "https://www.example.com/";
  
  const rightImageUrl = content.rightImageUrl || "https://dummyimage.com/1280x720";
  const rightImageLinkUrl = content.rightImageLinkUrl || "https://www.example.com";
  const rightHeadline = content.rightHeadline || "Headline";
  const rightText = content.rightText || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const rightButtonText = content.rightButtonText || "Please click me";
  const rightButtonUrl = content.rightButtonUrl || "https://www.example.com/";
  
  return `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #ffffff !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
      <tbody>
        <tr>
          <td>
            <table border="0" align="center" cellpadding="0" cellspacing="0" width="640" style="width: 640px;" class="width-100 dark-bgd" bgcolor="#ffffff" role="presentation">
              <tbody>
                <tr>
                  <td width="16"></td>
                  <td>
                    <table align="center" bgcolor="#EFEFF0" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; width: 100%;" class="width-100 dark-bgd" role="presentation">
                      <tbody>
                        <tr>
                          <td align="center" bgcolor="#FFFFFF" width="296" valign="top" class="templateColumnContainer">
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #efeff0;" class="width-100 dark-bgd" role="presentation">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size: 0; line-height: 0;">
                                    <a rel="noopener noreferrer" href="${leftImageLinkUrl}" target="_blank" aria-label="Image [description]">
                                      <img src="${leftImageUrl}" alt="Image" title="Image" width="296" height="auto" style="border: 0; width: 100%;">
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 30px 0 0 0;">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 100%; background-color: #efeff0;" class="width-100 dark-bgd" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td width="12"></td>
                                          <td>
                                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 100%; background-color: #efeff0;" class="dark-bgd" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0 0 18px 0;">
                                                    <h5 translate="yes" style="font-size: 18px; line-height: 24px; color: #003b6a; text-transform: uppercase; letter-spacing: -0.02em; font-family: 'Arial Black', Arial, Helvetica, sans-serif !important; font-weight: 900; text-align: left; padding: 0; margin: 0;" class="dark-font">${leftHeadline}</h5>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 0 0 24px 0;">
                                                    <p role="paragraph" translate="yes" style="font-size: 16px; line-height: 24px; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 0; margin: 0;" class="dark-font">
                                                      ${leftText}
                                                    </p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 0 0 24px 0;">
                                                    <a href="${leftButtonUrl}" class="dark-button" style="font-size: 16px; line-height: 24px; font-family: Arial, Helvetica, sans-serif !important; text-decoration: none; padding: 13px 16px; color: #ffffff; display: inline-block; background-color: #003b6a; mso-padding-alt: 0;" aria-label="Please click me to read more about [headline]">
                                                      <!--[if mso]>
                                                        <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 20pt;">&nbsp;</i>
                                                      <![endif]-->
                                                      <span translate="yes" style="mso-text-raise: 10pt; color: #ffffff;">${leftButtonText}</span>
                                                      <!--[if mso]>
                                                        <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
                                                      <![endif]-->
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td width="12"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td bgcolor="#ffffff" style="padding: 0 0 32px 0;" class="block-vertical-spacing dark-bgd"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td align="center" bgcolor="#ffffff" width="16" valign="top" class="templateColumnContainer dark-bgd"></td>
                          <td align="center" bgcolor="#ffffff" width="296" valign="top" class="templateColumnContainer">
                            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #efeff0;" class="width-100 dark-bgd" role="presentation">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size: 0; line-height: 0;">
                                    <a rel="noopener noreferrer" href="${rightImageLinkUrl}" target="_blank" aria-label="Image [description]">
                                      <img src="${rightImageUrl}" alt="Image" title="Image" width="296" height="auto" style="border: 0; width: 100%;">
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 30px 0 0 0;">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 100%; background-color: #efeff0;" class="width-100 dark-bgd" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td width="12"></td>
                                          <td>
                                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 100%; background-color: #efeff0;" class="dark-bgd" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0 0 18px 0;">
                                                    <h5 translate="yes" style="font-size: 18px; line-height: 24px; color: #003b6a; text-transform: uppercase; letter-spacing: -0.02em; font-family: 'Arial Black', Arial, Helvetica, sans-serif !important; text-align: left; font-weight: 900; padding: 0; margin: 0;" class="dark-font">${rightHeadline}</h5>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 0 0 24px 0;">
                                                    <p role="paragraph" translate="yes" style="font-size: 16px; line-height: 24px; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 0; margin: 0;" class="dark-font">
                                                      ${rightText}
                                                    </p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding: 0 0 24px 0;">
                                                    <a href="${rightButtonUrl}" class="dark-button" style="font-size: 16px; line-height: 24px; font-family: Arial, Helvetica, sans-serif !important; text-decoration: none; padding: 13px 16px; color: #ffffff; display: inline-block; background-color: #003b6a; mso-padding-alt: 0;" aria-label="Please click me to read more about [headline]">
                                                      <!--[if mso]>
                                                        <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 20pt;">&nbsp;</i>
                                                      <![endif]-->
                                                      <span translate="yes" style="mso-text-raise: 10pt; color: #ffffff;">${rightButtonText}</span>
                                                      <!--[if mso]>
                                                        <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
                                                      <![endif]-->
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td width="12"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td bgcolor="#ffffff" style="padding: 0 0 32px 0;" class="block-vertical-spacing dark-bgd"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td width="16"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</center>`;
}

function generateParagraphBlock(content: any): string {
  const greeting = content.greeting || "Hello,";
  const text = content.text || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const buttonText = content.buttonText || "Please click me";
  const buttonUrl = content.buttonUrl || "https://www.example.com/";
  
  return `<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
  <div class="webkit" style="max-width: 640px !important; background-color: #ffffff !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0;">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
      <tbody>
        <tr>
          <td>
            <table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; background-color: #ffffff; width: 640px;" class="width-100 dark-bgd" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; width: 100%;" role="presentation">
                      <tbody>
                        <tr>
                          <td width="16"></td>
                          <td style="padding: 0; background: #ffffff;" class="dark-bgd">
                            <table style="background-color: #ffffff; text-align: center; width: 100%;" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" align="center" class="dark-bgd" role="presentation">
                              <tbody>
                                <tr>
                                  <td style="padding: 0 0 18px 0;">
                                    <p role="paragraph" translate="yes" style="font-family: Arial, Helvetica, sans-serif !important; line-height: 24px !important; font-size: 18px; padding: 0; margin: 0; color: #003e64; font-weight: 900; text-align: center;" class="dark-font">${greeting}</p>
                                    <br>
                                    <p role="paragraph" translate="yes" style="font-family: Arial, Helvetica, sans-serif; line-height: 24px !important; font-size: 16px; padding: 0; margin: 0; text-align: center;">${text}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td width="16"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;" class="block-vertical-spacing">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td width="16"></td>
                          <td align="center" valign="middle">
                            <a href="${buttonUrl}" class="dark-button" style="border: 1px solid #003e64; font-size: 16px; line-height: 24px; font-family: Arial, Helvetica, sans-serif !important; text-decoration: none; padding: 13px 16px; color: #ffffff; display: inline-block; background-color: #003e64; mso-padding-alt: 0;" aria-label="Please click me to read more about [headline]">
                              <!--[if mso]>
                                <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 20pt;">&nbsp;</i>
                              <![endif]-->
                              <span translate="yes" style="mso-text-raise: 10pt; color: #ffffff;">${buttonText}</span>
                              <!--[if mso]>
                                <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 20pt;">&nbsp;</i>
                              <![endif]-->
                            </a>
                          </td>
                          <td width="16"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</center>`;
}

export function generateHTML(blocks: BlockData[]): string {
  const contentBlocks = blocks.map(generateBlockHTML).join("\n");
  
  return `${MASTER_TEMPLATE_START}
${HEADER}
${contentBlocks}
${FOOTER}
${MASTER_TEMPLATE_END}`;
}

export function generateBlockPreviewHTML(block: BlockData): string {
  const blockHTML = generateBlockHTML(block);
  
  return `<!DOCTYPE html>
<html>
<head>
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
<title>Block Preview</title>
<style>
body {
  width: 100% !important;
  margin: 0;
  padding: 0;
  background-color: #efeff0;
  font-family: Arial, Helvetica, sans-serif !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  border: 0;
}
p {
  padding: 0 !important;
  margin: 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
a:visited {
  color: #007BC0 !important;
}
.wrapper {
  width: 100% !important;
  table-layout: fixed !important;
  background-color: #efeff0 !important;
}
.webkit {
  max-width: 640px !important;
  background-color: #ffffff !important;
  display: block !important;
  margin: 0 auto !important;
  width: 100%;
}
</style>
</head>
<body>
${blockHTML}
</body>
</html>`;
}

export function generateHeaderPreviewHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
<title>Header Preview</title>
<style>
body {
  width: 100% !important;
  margin: 0;
  padding: 0;
  background-color: #efeff0;
  font-family: Arial, Helvetica, sans-serif !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  border: 0;
}
p {
  padding: 0 !important;
  margin: 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
a:visited {
  color: #007BC0 !important;
}
.wrapper {
  width: 100% !important;
  table-layout: fixed !important;
  background-color: #efeff0 !important;
}
.webkit {
  max-width: 640px !important;
  background-color: #ffffff !important;
  display: block !important;
  margin: 0 auto !important;
  width: 100%;
}
</style>
</head>
<body>
${HEADER}
</body>
</html>`;
}

export function generateFooterPreviewHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
<title>Footer Preview</title>
<style>
body {
  width: 100% !important;
  margin: 0;
  padding: 0;
  background-color: #efeff0;
  font-family: Arial, Helvetica, sans-serif !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  border: 0;
}
p {
  padding: 0 !important;
  margin: 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
a:visited {
  color: #007BC0 !important;
}
.wrapper {
  width: 100% !important;
  table-layout: fixed !important;
  background-color: #efeff0 !important;
}
.webkit {
  max-width: 640px !important;
  background-color: #003b6a !important;
  display: block !important;
  margin: 0 auto !important;
  width: 100%;
}
</style>
</head>
<body>
${FOOTER}
</body>
</html>`;
}
