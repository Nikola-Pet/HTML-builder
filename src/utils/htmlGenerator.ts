import { BlockData } from "@/contexts/EmailBuilderContext";

const MASTER_TEMPLATE_START = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--sapMktConditionHelper-->
    <!-- temporary included javascript lib, coming from SAP Marketing message editor; do not touch; it will be removed with upload file automatically -->
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <style type="text/css">
        div[data-sap-hpa-ceimo-block-type='SUBJECT'] .sapConditionHoverBtn {
            right: 0;
        }
        .sapConditionBtn {
            display: block;
            width: 100%;
            margin: 5px 0px;
            padding: 2px 20px;
        }
        .sapConditionHelper {
            background-color: lightgray;
            padding: 0px 5px;
            opacity: 0.8;
        }
        .sapConditionBtnActive {
            border: 1px solid lightgrey;
        }
        .sapConditionHoverBtn {
            padding: 2px 20px;
            opacity: 0.8;
        }
        .hideSapConditionHoverBtn {
            display: none;
        }
        div[data-sap-hpa-ceimo-condition]:nth-child(2) {
        	display: inherit;
        } 
    </style>
    <script type="text/javascript">
        var defaultConditionLabel = "Default";
        $(document).ready(function () {
            var aCondtions = [];
            $("div[data-sap-hpa-ceimo-condition]").each(function () {
            	if ($(this).attr("data-sap-hpa-ceimo-block-type") === "ASC") {
                    return;
                }
                var sCondition = $(this).data("sap-hpa-ceimo-condition");
                if (aCondtions.indexOf(sCondition) <= -1) {
                    aCondtions.push(sCondition);
                }
                sCondition = sCondition === "" ? defaultConditionLabel : sCondition;
                var sConditionHoverBtn = "<button class='sapConditionHoverBtn hideSapConditionHoverBtn' style='position: absolute'>" + sCondition + "</button>" + $(this).html();
                $(this).html(sConditionHoverBtn);
                $(this).hover(function () {
                    $($(this).children()[0]).removeClass("hideSapConditionHoverBtn");
                }, function () {
                    $(".sapConditionHoverBtn").addClass("hideSapConditionHoverBtn");
                });
            });
            aCondtions.reverse();
            if (aCondtions.length > 0) {
                $("body").after("<div class='sapConditionHelper' style='position: fixed; left: 0; top: 0;' ><strong class='sapConditionBtn'>Conditions:</strong></div>");
                $.each(aCondtions, function (iIndex, oButton) {
                    var btnLabel = !this || this.length === 0 ? defaultConditionLabel : this;
                    $(".sapConditionHelper").html($(".sapConditionHelper").html() + "<button class='sapConditionBtn' data-sap-hpa-ceimo-condition='" + this + "'>" + btnLabel + "</button>");
                });
                $(".sapConditionHelper").html($(".sapConditionHelper").html() + "<button class='sapConditionBtn' data-sap-hpa-ceimo-condition='__all__'>All</button> ");
                $("button[data-sap-hpa-ceimo-condition]").each(function () {
                    $(this).click(function () {
                        $(".sapConditionBtn").removeClass("sapConditionBtnActive");
                        $(this).addClass("sapConditionBtnActive");
                        var sCondition = $(this).data("sap-hpa-ceimo-condition");
                        $("div[data-sap-hpa-ceimo-condition]").each(function () {
                            $(this).show();
                        });
                        if (sCondition !== "__all__") {
                            $("div[data-sap-hpa-ceimo-condition]").each(function () {
                                if ($(this).data("sap-hpa-ceimo-condition") !== sCondition) {
                                    $(this).hide();
                                }
                                var sBlockId = $(this).data("sap-hpa-ceimo-blockid");
                                var bFound = false;
                                $("div[data-sap-hpa-ceimo-blockid='" + sBlockId + "']").each(function () {
                                    if ($(this).data("sap-hpa-ceimo-condition") !== "" && $(this).data("sap-hpa-ceimo-condition") === sCondition) {
                                        bFound = true;
                                        return false;
                                    }
                                });
                                if (!bFound && $(this).data("sap-hpa-ceimo-condition") === "") {
                                    $(this).show();
                                }
                            });
                        }
                    });
                });
                $("button[data-sap-hpa-ceimo-condition='']").click();
            }
        });
    </script>
    <!--sapMktConditionHelper-->
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="text/html;charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta
      name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no"
    />
<title>EmailTemplate</title>
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
    <!--[if gte mso 7]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if mso]>
      <style>
        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        td,
        a,
        .text,
        font,
        span,
        p {
          font-family: Arial, Helvetica, sans-serif !important;
          margin: 0;
          padding: 0;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
        }
        body {
          background-color: white !important;
        }
      </style>
    <![endif]-->
</head>
<body>`;

// Dynamic subject line block generator (previously SUBJECTLINE constant)
function generateSubjectLineBlock(subjectLine: string): string {
  const safe = escapeHtml(subjectLine);
  return `<div style="text-align: center; width: 100%; padding: 10px;" class="sapMktBlock"
data-sap-hpa-ceimo-block-type="SUBJECT"
data-sap-hpa-ceimo-condition=""
data-sap-hpa-ceimo-blockid="1663339614972477"
data-sap-hpa-ceimo-blockid-parent=""
data-sap-hpa-ceimo-block-editable="X">${safe}</div>`;
}

// Dynamic preheader generator (previously PREHEADER constant) – hidden preview text for inbox
function generatePreheaderBlock(preheader: string): string {
  const safe = escapeHtml(preheader);
  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
<div style="float: left; width: 100%" class="sapMktBlock"
data-sap-hpa-ceimo-block-type="TEXT"
data-sap-hpa-ceimo-condition=""
data-sap-hpa-ceimo-blockid="1763988864454984"
data-sap-hpa-ceimo-blockid-parent=""
data-sap-hpa-ceimo-block-editable="X">
<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">${safe}</div>
</div><!--[if mso]></td></tr></table><![endif]-->`;
}

// Simple HTML escaper to prevent injection inside subject/preheader content
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Language-specific data interface for header/footer
export interface LanguageData {
  boschLogo?: string;
  readOnline?: string;
  followUs?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

const HEADER = `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1663339614974478"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="
          table-layout: fixed !important;
          width: 100%;
          background-color: #efeff0;
        "
      >
        <div
          class="webkit"
          style="
            max-width: 640px !important;
            background-color: #ffffff !important;
            display: block !important;
            margin: 0;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    width="640"
                    bgcolor="#FFFFFF"
                    class="width-100 dark-bgd"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            border="0"
                            bgcolor="#EFEFF0"
                            cellpadding="0"
                            cellspacing="0"
                            style="width: 100%"
                            class="width-100 dark-bgd"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  width="70%"
                                  valign="middle"
                                  style="padding-top: 16px"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="width: 100%"
                                    class="width-100 dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td width="16"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  align="center"
                                  width="30%"
                                  valign="middle"
                                  style="padding-top: 16px"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="width: 100%"
                                    bgcolor="#EFEFF0"
                                    class="width-100 dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td align="right" valign="top">
                                          <a
                                            rel="noopener noreferrer"
                                            href="#"
                                            target="_blank"
                                            title="Read online &rsaquo;"
                                            class="online dark-font"
                                            style="
                                              color: #003b6a;
                                              font-family: Arial, Helvetica,
                                                sans-serif;
                                              font-size: 14px;
                                            "
                                            data-sap-hpa-ceimo-link-type="ShowInBrowser"
                                            data-sap-hpa-ceimo-link-id="1747728867947350"
                                            >Read online &rsaquo;</a
                                          >
                                        </td>
                                        <td width="16"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td height="16"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="width: 100%; border-collapse: collapse"
                            role="presentation"
                          >
                            <tbody>
                              <tr
                                style="
                                  font-size: 1px;
                                  mso-line-height-alt: 0;
                                  mso-margin-top-alt: 1px;
                                "
                              >
                                <td>
                                  <!--[if mso]>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        width: 100%;
                                        border-collapse: collapse;
                                      "
                                      role="presentation"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            line-height: 0;
                                            font-size: 0;
                                            display: block !important;
                                            border-collapse: collapse;
                                            background-color: #005691 !important;
                                          "
                                          border="0"
                                          bgcolor="#005691"
                                        >
                                          <img
                                            src="https://cdn.boschtools.com/B2B/retention_marketing/images/assets/images/supergraphic.jpg"
                                            alt="bosch colors"
                                            border="0"
                                            height="10"
                                            width="640"
                                            style="
                                              width: 100%;
                                              height: 10px;
                                              line-height: 0;
                                              font-size: 0;
                                              display: block !important;
                                              margin: 0;
                                              padding: 0;
                                              border-spacing: 0px;
                                              border: 0;
                                            "
                                          />
                                        </td>
                                      </tr></table
                                  ><![endif]-->
                                  <!--[if !mso]> <!---->
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      width: 100%;
                                      border-collapse: collapse;
                                    "
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          bgcolor="#005691"
                                          style="
                                            line-height: 0;
                                            font-size: 0;
                                            display: block;
                                            border-collapse: collapse;
                                            background-color: #005691;
                                          "
                                        >
                                          <img
                                            src="https://cdn.boschtools.com/B2B/retention_marketing/images/assets/images/supergraphic.jpg"
                                            border="0"
                                            alt="bosch colors"
                                            width="640"
                                            height="7"
                                            style="
                                              width: 100%;
                                              height: 7px;
                                              line-height: 0;
                                              font-size: 0;
                                              display: block;
                                              margin: 0;
                                              padding: 0;
                                              border-spacing: 0px;
                                              border: 0;
                                            "
                                            data-sap-hpa-ceimo-image-id="1747728867947352"
                                            data-sap-hpa-ceimo-image="SMOImage"
                                            data-sap-hpa-ceimo-image-type="Static"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <!-- <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            border="0"
                            bgcolor="#003b6a"
                            cellpadding="0"
                            cellspacing="0"
                            style="width: 100%; background-color: #003b6a"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  bgcolor="#003b6a"
                                  height="24"
                                  style="background-color: #003b6a"
                                ></td>
                              </tr>
                              <tr>
                                <td>
                                  <table
                                    border="0"
                                    bgcolor="#003b6a"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      width: 100%;
                                      background-color: #003b6a;
                                    "
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          width="50%"
                                          valign="middle"
                                          style="background-color: #003b6a"
                                        >
                                          <table
                                            border="0"
                                            bgcolor="#003b6a"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                                              width: 100%;
                                              background-color: #003b6a;
                                            "
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  bgcolor="#003b6a"
                                                  width="16"
                                                  style="
                                                    background-color: #003b6a;
                                                  "
                                                ></td>
                                                <td
                                                  align="left"
                                                  bgcolor="#003b6a"
                                                  valign="middle"
                                                  style="
                                                    background-color: #003b6a;
                                                  "
                                                >
                                                  <a
                                                    rel="noopener noreferrer"
                                                    href="https://www.bosch-professional.com/gb/en/"
                                                    target="_blank"
                                                    title="Bosch professional website"
                                                    data-sap-hpa-ceimo-link-id="1747728867947351"
                                                    data-sap-hpa-ceimo-link-outboundid="X"
                                                    data-sap-hpa-ceimo-link-utm="X"
                                                    data-sap-hpa-ceimo-link-trackable="X"
                                                    data-sap-hpa-ceimo-link-type="Static"
                                                    data-sap-hpa-ceimo-link-alias="httpswwwboschprofessionalcomgben"
                                                    ><img
                                                      class="logo"
                                                      src="https://cdnboschtools.blob.core.windows.net/boschtools/B2B/retention_marketing/images/assets/images/bosch_white.png"
                                                      border="0"
                                                      alt="Bosch homepage"
                                                      title="Bosch homepage"
                                                      height="40"
                                                      style="
                                                        height: 40px;
                                                        opacity: 1;
                                                      "
                                                      data-sap-hpa-ceimo-image-id="1747728867947353"
                                                      data-sap-hpa-ceimo-image="SMOImage"
                                                      data-sap-hpa-ceimo-image-type="Static"
                                                  /></a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td
                                          align="center"
                                          bgcolor="#003b6a"
                                          width="50%"
                                          valign="middle"
                                          style="background-color: #003b6a"
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            bgcolor="#003b6a"
                                            style="
                                              background-color: #003b6a;
                                              width: 100%;
                                            "
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="right"
                                                  bgcolor="#003b6a"
                                                  valign="middle"
                                                  style="
                                                    background-color: #003b6a;
                                                  "
                                                >
                                                  <p
                                                    style="
                                                      font-size: 24px;
                                                      line-height: 30px;
                                                      font-weight: 900;
                                                      text-transform: uppercase;
                                                      letter-spacing: -0.02em;
                                                      color: #ffffff;
                                                      font-family: Arial,
                                                        Helvetica, sans-serif !important;
                                                      padding: 0;
                                                      margin: 0;
                                                    "
                                                  >
                                                    PRO NEWS
                                                  </p>
                                                </td>
                                                <td
                                                  bgcolor="#003b6a"
                                                  width="16"
                                                  style="
                                                    background-color: #003b6a;
                                                  "
                                                ></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  bgcolor="#003b6a"
                                  height="32"
                                  style="background-color: #003b6a"
                                ></td>
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
      </center>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->`;

const FOOTER = `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
<div style="float: left; width: 100%" class="sapMktBlock"
data-sap-hpa-ceimo-block-type="TEXT"
data-sap-hpa-ceimo-condition=""
data-sap-hpa-ceimo-blockid="1663339614980483"
data-sap-hpa-ceimo-blockid-parent=""
data-sap-hpa-ceimo-block-editable="X">
<center role="main" class="wrapper" style="table-layout: fixed !important; width: 100%; background-color: #efeff0;">
<div class="webkit" style="max-width: 640px !important; background-color: #003b6a !important; display: block !important; margin: 0; width: 100%; font-family: Arial, Helvetica, sans-serif; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: none !important; padding: 0;">
<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#efeff0" style="border-spacing: 0; background-color: #efeff0 !important; border-collapse: collapse; width: 100%;" role="presentation">
<tbody>
<tr>
<td>
<table width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 0; background-color: #003b6a; width: 640px;" class="width-100 dark-bgd" role="presentation">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" bgcolor="#003b6a" style="border-spacing: 0; width: 100%; background-color: #003b6a;" class="dark-bgd" role="presentation">
<tbody>
<tr>
<td align="center" style="padding: 32px 0 16px 0;">
<p style="font-size: 16px; line-height: 24px; color: #ffffff; font-weight: 900; padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif !important;">Follow us</p>
</td>
</tr>
<tr>
<td align="center" style="padding: 0 0 24px 0; background: #003b6a;" class="padding-bottom-24 dark-bgd">
<table style="background-color: #003b6a; text-align: center;" cellspacing="0" cellpadding="0" border="0" bgcolor="#003b6a" align="center" class="dark-bgd" role="presentation">
<tbody>
<tr>
<td align="center" width="56"><a rel="noopener noreferrer" href="https://www.facebook.com/BoschProfessionalPowerToolsUK" target="_blank" title="Facebook page" data-sap-hpa-ceimo-link-id="1747728881489355" data-sap-hpa-ceimo-link-outboundid="X" data-sap-hpa-ceimo-link-utm="X" data-sap-hpa-ceimo-link-trackable="X" data-sap-hpa-ceimo-link-type="Static" data-sap-hpa-ceimo-link-alias="httpswwwfacebookcomBoschProfessionalPowerToolsUK"> <img src="https://cdnboschtools.blob.core.windows.net/boschtools/PRO/facebook-frame.png" alt="Facebook page" title="Facebook page" height="40" style="max-height: 40px; opacity: 1;" aria-label="Facebook page" data-sap-hpa-ceimo-image-id="1747728881489358" data-sap-hpa-ceimo-image="SMOImage" data-sap-hpa-ceimo-image-type="Static"> </a></td>
<td align="center" width="56"><a rel="noopener noreferrer" href="https://www.instagram.com/boschprouk/" target="_blank" title="Link" data-sap-hpa-ceimo-link-id="1747728881489356" data-sap-hpa-ceimo-link-outboundid="X" data-sap-hpa-ceimo-link-utm="X" data-sap-hpa-ceimo-link-trackable="X" data-sap-hpa-ceimo-link-type="Static" data-sap-hpa-ceimo-link-alias="httpswwwinstagramcomboschprouk"> <img src="https://cdnboschtools.blob.core.windows.net/boschtools/PRO/instagram-frame.png" alt="Instagram page" title="Instagram page" height="40" style="max-height: 40px; opacity: 1;" aria-label="Instagram page" data-sap-hpa-ceimo-image-id="1747728881489359" data-sap-hpa-ceimo-image="SMOImage" data-sap-hpa-ceimo-image-type="Static"> </a></td>
<td align="center" width="56"><a rel="noopener noreferrer" href="https://www.youtube.com/user/BoschProfessionalUK" target="_blank" title="Link" data-sap-hpa-ceimo-link-id="1747728881489357" data-sap-hpa-ceimo-link-outboundid="X" data-sap-hpa-ceimo-link-utm="X" data-sap-hpa-ceimo-link-trackable="X" data-sap-hpa-ceimo-link-type="Static" data-sap-hpa-ceimo-link-alias="httpswwwyoutubecomuserBoschProfessionalUK"> <img src="https://cdnboschtools.blob.core.windows.net/boschtools/PRO/youtube-frame.png" alt="Youtube page" title="Youtube page" height="40" style="max-height: 40px; opacity: 1;" aria-label="Youtube page" data-sap-hpa-ceimo-image-id="1747728881489360" data-sap-hpa-ceimo-image="SMOImage" data-sap-hpa-ceimo-image-type="Static"></a></td>
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
</center>
</div><!--[if mso]></td></tr></table><![endif]-->`;

const MASTER_TEMPLATE_END = `</body></html>`;

const DEFAULT_LINK_ALIAS = "httpswwwexamplecom";

function getLinkAlias(url?: string): string {
  if (!url || !url.trim()) {
    return DEFAULT_LINK_ALIAS;
  }

  const sanitized = url.replace(/[^a-zA-Z0-9]/g, "");
  return sanitized || DEFAULT_LINK_ALIAS;
}

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

type GenericContent = Record<string, unknown>;
function generateImageTextBlock(content: GenericContent): string {
  const imageLinkUrl =
    content.imageLinkUrl || content.buttonUrl || "https://www.example.com";
  const buttonUrl = content.buttonUrl || "https://www.example.com/";
  const imageUrl = content.imageUrl || "https://dummyimage.com/1280x720";
  const headline = content.headline || "Headline";
  const text =
    content.text ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const buttonText = content.buttonText || "Please click me";
  const imageLinkAlias = getLinkAlias(String(imageLinkUrl));
  const buttonAlias = getLinkAlias(String(buttonUrl));

  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1763988864454984"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="width: 100%; background-color: #efeff0"
      >
        <div
          class="webkit"
          style="
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
            margin: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    dir="ltr"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    bgcolor="#ffffff"
                    width="640"
                    align="center"
                    style="
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      background-color: #ffffff !important;
                      width: 640px;
                    "
                    class="width-100 dark-bgd"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td width="16" class="dark-bgd"></td>
                        <td
                          style="padding: 0 0 32px 0"
                          class="block-vertical-spacing dark-bgd"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            style="border-spacing: 0; width: 100%"
                            class="dark-bgd"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    style="border-spacing: 0; width: 100%"
                                    class="dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          width="328"
                                          valign="top"
                                          style="font-size: 0; line-height: 0"
                                          class="templateColumnContainer padding-bottom-36"
                                          dir="ltr"
                                        >
                                          <a
                                            rel="noopener noreferrer"
                                            href="${imageLinkUrl}"
                                            target="_blank"
                                            aria-label="${headline}"
                                            data-sap-hpa-ceimo-link-id="17478280828454949"
                                            data-sap-hpa-ceimo-link-outboundid="X"
                                            data-sap-hpa-ceimo-link-utm="X"
                                            data-sap-hpa-ceimo-link-trackable="X"
                                          data-sap-hpa-ceimo-link-alias="${imageLinkAlias}"
                                          >
                                            <img
                                              class="responsiveIMG"
                                              src="${imageUrl}"
                                              alt="${headline}"
                                              title="${headline}"
                                              width="328"
                                              height="auto"
                                              style="opacity: 1; width: 100%"
                                              data-sap-hpa-ceimo-image-id="17478280828464951"
                                              data-sap-hpa-ceimo-image="SMOImage"
                                              data-sap-hpa-ceimo-image-type="Static"
                                            />
                                          </a>
                                        </td>
                                        <td width="16" class="hide"></td>
                                        <td
                                          width="264"
                                          valign="top"
                                          style="text-align: left; padding: 0"
                                          class="templateColumnContainer"
                                          dir="ltr"
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="center"
                                            style="width: 100%"
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td style="padding: 0 0 18px 0">
                                                  <h5
                                                    translate="yes"
                                                    class="dark-font"
                                                    style="
                                                      font-size: 18px;
                                                      line-height: 24px;
                                                      color: #003b6a;
                                                      text-transform: uppercase;
                                                      letter-spacing: -0.02em;
                                                      font-weight: 900;
                                                      font-family: 'Arial Black',
                                                        Arial, Helvetica,
                                                        sans-serif !important;
                                                      text-align: left;
                                                      padding: 0;
                                                      margin: 0;
                                                    "
                                                  >
                                                    ${headline}
                                                  </h5>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style="padding: 0 0 24px 0">
                                                  <p
                                                    role="paragraph"
                                                    translate="yes"
                                                    style="
                                                      font-size: 16px;
                                                      line-height: 24px;
                                                      font-family: Arial,
                                                        Helvetica, sans-serif;
                                                      padding: 0;
                                                      margin: 0;
                                                    "
                                                  >
                                                    ${text}
                                                  </p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style="padding: 0 0 24px 0">
                                                  <a
                                                    href="${buttonUrl}"
                                                    class="dark-button"
                                                    style="
                                                      font-size: 16px;
                                                      line-height: 24px;
                                                      font-family: Arial,
                                                        Helvetica, sans-serif !important;
                                                      text-decoration: none;
                                                      padding: 13px 16px;
                                                      color: #ffffff;
                                                      display: inline-block;
                                                      background-color: #003b6a;
                                                      mso-padding-alt: 0;
                                                    "
                                                    aria-label="${buttonText}"
                                                    data-sap-hpa-ceimo-link-id="17478280828464950"
                                                    data-sap-hpa-ceimo-link-outboundid="X"
                                                    data-sap-hpa-ceimo-link-utm="X"
                                                    data-sap-hpa-ceimo-link-trackable="X"
                                                    data-sap-hpa-ceimo-link-alias="${buttonAlias}"
                                                  >
                                                    <!--[if mso]>
                                                      <i
                                                        style="
                                                          letter-spacing: 25px;
                                                          mso-font-width: -100%;
                                                          mso-text-raise: 20pt;
                                                        "
                                                        >&nbsp;</i
                                                      >
                                                    <![endif]-->
                                                    <span
                                                      translate="yes"
                                                      style="
                                                        mso-text-raise: 10pt;
                                                        color: #ffffff;
                                                      "
                                                      >${buttonText}</span
                                                    >
                                                    <!--[if mso]>
                                                      <i
                                                        style="
                                                          letter-spacing: 25px;
                                                          mso-font-width: -100%;
                                                        "
                                                        >&nbsp;</i
                                                      >
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
      </center>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->`;
}

function generateBannerBlock(content: GenericContent): string {
  const linkUrl = content.linkUrl || "https://www.example.com/";
  const imageUrl = content.imageUrl || "https://dummyimage.com/1280x720";
  const altText = content.altText || "Banner image [description]";
  const linkAlias = getLinkAlias(String(linkUrl));

  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1763988095282599"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="
          table-layout: fixed !important;
          width: 100%;
          background-color: #efeff0;
        "
      >
        <div
          class="webkit"
          style="
            max-width: 640px !important;
            background-color: #efeff0 !important;
            display: block !important;
            margin: 0;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="640"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-spacing: 0; background-color: #ffffff"
                    class="width-100 dark-bgd"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="padding: 0 0 32px 0"
                          class="block-vertical-spacing"
                        >
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-spacing: 0; width: 100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    font-size: 0;
                                    line-height: 0;
                                    display: block;
                                  "
                                >
                                  <a
                                    rel="noopener noreferrer"
                                    href="${linkUrl}"
                                    target="_blank"
                                    aria-label="${altText}"
                                    data-sap-hpa-ceimo-link-id="174783364504110234"
                                    data-sap-hpa-ceimo-link-outboundid="X"
                                    data-sap-hpa-ceimo-link-utm="X"
                                    data-sap-hpa-ceimo-link-trackable="X"
                                    data-sap-hpa-ceimo-link-alias="${linkAlias}"
                                  >
                                    <img
                                      class="responsive-img"
                                      src="${imageUrl}"
                                      alt="${altText}"
                                      title="${altText}"
                                      width="640"
                                      style="border: 0; max-width: 100%"
                                      data-sap-hpa-ceimo-image-id="174783364504210235"
                                      data-sap-hpa-ceimo-image="SMOImage"
                                      data-sap-hpa-ceimo-image-type="Static"
                                    />
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
      </center>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->`;
}

function generateHeadlineBlock(content: GenericContent): string {
  const text = content.text || "Lorem Ipsum is simply dummy text";

  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1763988126944853"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="
          table-layout: fixed !important;
          width: 100%;
          background-color: #efeff0;
        "
      >
        <div
          class="webkit"
          style="
            max-width: 640px !important;
            background-color: #ffffff !important;
            display: block !important;
            margin: 0;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="640"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-spacing: 0; background-color: #ffffff"
                    class="width-100 dark-bgd"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            width="640"
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-spacing: 0; width: 100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  width="640"
                                  style="
                                    padding: 32px 0 32px 0;
                                    background-color: #ffffff;
                                    width: 100%;
                                  "
                                  class="block-vertical-spacing dark-bgd width-100"
                                >
                                  <table
                                    style="
                                      background-color: #ffffff;
                                      text-align: center;
                                      width: 640px;
                                    "
                                    width="640"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    bgcolor="#ffffff"
                                    align="center"
                                    class="width-100 dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          bgcolor="#ffffff"
                                          width="24"
                                          style="
                                            width: 24px;
                                            height: 0;
                                            line-height: 0;
                                          "
                                          class="dark-bgd"
                                        ></td>
                                        <td>
                                          <h2
                                            translate="yes"
                                            class="dark-font"
                                            style="
                                              font-size: 36px;
                                              line-height: 44px;
                                              color: #003b6a;
                                              font-family: 'Arial Black', Arial,
                                                Helvetica, sans-serif !important;
                                              font-weight: 900;
                                              padding: 0;
                                              margin: 0;
                                              text-transform: uppercase;
                                              letter-spacing: -0.05em;
                                            "
                                          >
                                            ${text}
                                          </h2>
                                        </td>
                                        <td
                                          bgcolor="#ffffff"
                                          width="24"
                                          class="dark-bgd"
                                        ></td>
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
      </center>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->`;
}

function generateTwinTeaserBlock(content: GenericContent): string {
  const leftImageUrl =
    content.leftImageUrl || "https://dummyimage.com/1280x720";
  const leftImageLinkUrl =
    content.leftImageLinkUrl || "https://www.example.com";
  const leftHeadline = content.leftHeadline || "Headline";
  const leftText =
    content.leftText ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const leftButtonText = content.leftButtonText || "Please click me";
  const leftButtonUrl = content.leftButtonUrl || "https://www.example.com/";

  const rightImageUrl =
    content.rightImageUrl || "https://dummyimage.com/1280x720";
  const rightImageLinkUrl =
    content.rightImageLinkUrl || "https://www.example.com";
  const rightHeadline = content.rightHeadline || "Headline";
  const rightText =
    content.rightText ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const rightButtonText = content.rightButtonText || "Please click me";
  const rightButtonUrl = content.rightButtonUrl || "https://www.example.com/";
  const leftImageLinkAlias = getLinkAlias(String(leftImageLinkUrl));
  const leftButtonAlias = getLinkAlias(String(leftButtonUrl));
  const rightImageLinkAlias = getLinkAlias(String(rightImageLinkUrl));
  const rightButtonAlias = getLinkAlias(String(rightButtonUrl));

  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1763988120606773"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="
          table-layout: fixed !important;
          width: 100%;
          background-color: #efeff0;
        "
      >
        <div
          class="webkit"
          style="
            max-width: 640px !important;
            background-color: #ffffff !important;
            display: block !important;
            margin: 0;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    width="640"
                    style="width: 640px"
                    class="width-100 dark-bgd"
                    bgcolor="#ffffff"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td width="16"></td>
                        <td>
                          <table
                            align="center"
                            bgcolor="#EFEFF0"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-spacing: 0; width: 100%"
                            class="width-100 dark-bgd"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  bgcolor="#FFFFFF"
                                  width="296"
                                  valign="top"
                                  class="templateColumnContainer"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      width: 100%;
                                      background-color: #efeff0;
                                    "
                                    class="width-100 dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style="font-size: 0; line-height: 0"
                                        >
                                          <a
                                            rel="noopener noreferrer"
                                            href="${leftImageLinkUrl}"
                                            target="_blank"
                                            aria-label="${leftHeadline}"
                                            data-sap-hpa-ceimo-link-id="17478271544314020"
                                            data-sap-hpa-ceimo-link-outboundid="X"
                                            data-sap-hpa-ceimo-link-utm="X"
                                            data-sap-hpa-ceimo-link-trackable="X"
                                          data-sap-hpa-ceimo-link-alias="${leftImageLinkAlias}"
                                          >
                                            <img
                                              src="${leftImageUrl}"
                                              alt="${leftHeadline}"
                                              title="${leftHeadline}"
                                              width="296"
                                              height="auto"
                                              style="border: 0; width: 100%"
                                              data-sap-hpa-ceimo-image-id="17478271544334024"
                                              data-sap-hpa-ceimo-image="SMOImage"
                                              data-sap-hpa-ceimo-image-type="Static"
                                            />
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 30px 0 0 0">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="center"
                                            style="
                                              width: 100%;
                                              background-color: #efeff0;
                                            "
                                            class="width-100 dark-bgd"
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td width="12"></td>
                                                <td>
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    align="center"
                                                    style="
                                                      width: 100%;
                                                      background-color: #efeff0;
                                                    "
                                                    class="dark-bgd"
                                                    role="presentation"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0 0 18px 0;
                                                          "
                                                        >
                                                          <h5
                                                            translate="yes"
                                                            style="
                                                              font-size: 18px;
                                                              line-height: 24px;
                                                              color: #003b6a;
                                                              text-transform: uppercase;
                                                              letter-spacing: -0.02em;
                                                              font-family: 'Arial Black',
                                                                Arial, Helvetica,
                                                                sans-serif !important;
                                                              font-weight: 900;
                                                              text-align: left;
                                                              padding: 0;
                                                              margin: 0;
                                                            "
                                                            class="dark-font"
                                                          >
                                                            ${leftHeadline}
                                                          </h5>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0 0 24px 0;
                                                          "
                                                        >
                                                          <p
                                                            role="paragraph"
                                                            translate="yes"
                                                            style="
                                                              font-size: 16px;
                                                              line-height: 24px;
                                                              color: #000000;
                                                              font-family: Arial,
                                                                Helvetica,
                                                                sans-serif;
                                                              padding: 0;
                                                              margin: 0;
                                                            "
                                                            class="dark-font"
                                                          >
                                                            ${leftText}
                                                          </p>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0 0 24px 0;
                                                          "
                                                        >
                                                          <a
                                                            href="${leftButtonUrl}"
                                                            class="dark-button"
                                                            style="
                                                              font-size: 16px;
                                                              line-height: 24px;
                                                              font-family: Arial,
                                                                Helvetica,
                                                                sans-serif !important;
                                                              text-decoration: none;
                                                              padding: 13px 16px;
                                                              color: #ffffff;
                                                              display: inline-block;
                                                              background-color: #003b6a;
                                                              mso-padding-alt: 0;
                                                            "
                                                            aria-label="${leftButtonText}"
                                                            data-sap-hpa-ceimo-link-id="17478271544324021"
                                                            data-sap-hpa-ceimo-link-outboundid="X"
                                                            data-sap-hpa-ceimo-link-utm="X"
                                                            data-sap-hpa-ceimo-link-trackable="X"
                                                            data-sap-hpa-ceimo-link-alias="${leftButtonAlias}"
                                                          >
                                                            <!--[if mso]>
                                                              <i
                                                                style="
                                                                  letter-spacing: 25px;
                                                                  mso-font-width: -100%;
                                                                  mso-text-raise: 20pt;
                                                                "
                                                                >&nbsp;</i
                                                              >
                                                            <![endif]-->
                                                            <span
                                                              translate="yes"
                                                              style="
                                                                mso-text-raise: 10pt;
                                                                color: #ffffff;
                                                              "
                                                              >${leftButtonText}</span
                                                            >
                                                            <!--[if mso]>
                                                              <i
                                                                style="
                                                                  letter-spacing: 25px;
                                                                  mso-font-width: -100%;
                                                                "
                                                                >&nbsp;</i
                                                              >
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
                                        <td
                                          bgcolor="#ffffff"
                                          style="padding: 0 0 32px 0"
                                          class="block-vertical-spacing dark-bgd"
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  align="center"
                                  bgcolor="#ffffff"
                                  width="16"
                                  valign="top"
                                  class="templateColumnContainer dark-bgd"
                                ></td>
                                <td
                                  align="center"
                                  bgcolor="#ffffff"
                                  width="296"
                                  valign="top"
                                  class="templateColumnContainer"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      width: 100%;
                                      background-color: #efeff0;
                                    "
                                    class="width-100 dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style="font-size: 0; line-height: 0"
                                        >
                                          <a
                                            rel="noopener noreferrer"
                                            href="${rightImageLinkUrl}"
                                            target="_blank"
                                            aria-label="${rightHeadline}"
                                            data-sap-hpa-ceimo-link-id="17478271544324022"
                                            data-sap-hpa-ceimo-link-outboundid="X"
                                            data-sap-hpa-ceimo-link-utm="X"
                                            data-sap-hpa-ceimo-link-trackable="X"
                                          data-sap-hpa-ceimo-link-alias="${rightImageLinkAlias}"
                                          >
                                            <img
                                              src="${rightImageUrl}"
                                              alt="${rightHeadline}"
                                              title="${rightHeadline}"
                                              width="296"
                                              height="auto"
                                              style="border: 0; width: 100%"
                                              data-sap-hpa-ceimo-image-id="17478271544334025"
                                              data-sap-hpa-ceimo-image="SMOImage"
                                              data-sap-hpa-ceimo-image-type="Static"
                                            />
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 30px 0 0 0">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="center"
                                            style="
                                              width: 100%;
                                              background-color: #efeff0;
                                            "
                                            class="width-100 dark-bgd"
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td width="12"></td>
                                                <td>
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    align="center"
                                                    style="
                                                      width: 100%;
                                                      background-color: #efeff0;
                                                    "
                                                    class="dark-bgd"
                                                    role="presentation"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0 0 18px 0;
                                                          "
                                                        >
                                                          <h5
                                                            translate="yes"
                                                            style="
                                                              font-size: 18px;
                                                              line-height: 24px;
                                                              color: #003b6a;
                                                              text-transform: uppercase;
                                                              letter-spacing: -0.02em;
                                                              font-family: 'Arial Black',
                                                                Arial, Helvetica,
                                                                sans-serif !important;
                                                              text-align: left;
                                                              font-weight: 900;
                                                              padding: 0;
                                                              margin: 0;
                                                            "
                                                            class="dark-font"
                                                          >
                                                            ${rightHeadline}
                                                          </h5>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding: 0 0 24px 0;
                                                          "
                                                        >
                                                          <p
                                                            role="paragraph"
                                                            translate="yes"
                                                            style="
                                                              font-size: 16px;
                                                              line-height: 24px;
                                                              color: #000000;
                                                              font-family: Arial,
                                                                Helvetica,
                                                                sans-serif;
`;
}
function generateParagraphBlock(content: GenericContent): string {
  const greeting = content.greeting || "Hello,";
  const text =
    content.text ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const buttonText = content.buttonText || "Please click me";
  const buttonUrl = content.buttonUrl || "https://www.example.com/";
  const buttonAlias = getLinkAlias(String(buttonUrl));

  return `<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" style="mso-table-lspace:0pt;  mso-table-rspace:0pt; border-collapse: collapse; width: 100%"><tr><td style="width: 100%;"><![endif]-->
    <div
      style="float: left; width: 100%"
      class="sapMktBlock"
      data-sap-hpa-ceimo-block-type="TEXT"
      data-sap-hpa-ceimo-condition=""
      data-sap-hpa-ceimo-blockid="1763988104665660"
      data-sap-hpa-ceimo-blockid-parent=""
      data-sap-hpa-ceimo-block-editable="X"
    >
      <center
        role="main"
        class="wrapper"
        style="
          table-layout: fixed !important;
          width: 100%;
          background-color: #efeff0;
        "
      >
        <div
          class="webkit"
          style="
            max-width: 640px !important;
            background-color: #ffffff !important;
            display: block !important;
            margin: 0;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: none !important;
            padding: 0;
          "
        >
          <table
            width="100%"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            bgcolor="#efeff0"
            style="
              border-spacing: 0;
              background-color: #efeff0 !important;
              border-collapse: collapse;
              width: 100%;
            "
            role="presentation"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="640"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-spacing: 0;
                      background-color: #ffffff;
                      width: 640px;
                    "
                    class="width-100 dark-bgd"
                    role="presentation"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-spacing: 0; width: 100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td width="16"></td>
                                <td
                                  style="padding: 0 0 0 0; background: #ffffff"
                                  class="dark-bgd"
                                >
                                  <table
                                    style="
                                      background-color: #ffffff;
                                      text-align: center;
                                      width: 100%;
                                    "
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    bgcolor="#ffffff"
                                    align="center"
                                    class="dark-bgd"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="padding: 0 0 18px 0">
                                          <p
                                            role="paragraph"
                                            translate="yes"
                                            style="
                                              font-family: Arial, Helvetica,
                                                sans-serif !important;
                                              line-height: 24px !important;
                                              font-size: 18px;
                                              padding: 0;
                                              margin: 0;
                                              color: #003e64;
                                              font-weight: 900;
                                              text-align: center;
                                            "
                                            class="dark-font"
                                          >
                                            ${greeting}
                                          </p>
                                          <br />
                                          <p
                                            role="paragraph"
                                            translate="yes"
                                            style="
                                              font-family: Arial, Helvetica,
                                                sans-serif;
                                              line-height: 24px !important;
                                              font-size: 16px;
                                              padding: 0;
                                              margin: 0;
                                              text-align: center;
                                            "
                                          >
                                            ${text}
                                          </p>
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
                        <td
                          align="center"
                          style="padding: 0 0 32px 0"
                          class="block-vertical-spacing"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td width="16"></td>
                                <td align="center" valign="middle">
                                  <a
                                    href="${buttonUrl}"
                                    class="dark-button"
                                    style="
                                      border: 1px solid #003e64;
                                      font-size: 16px;
                                      line-height: 24px;
                                      font-family: Arial, Helvetica, sans-serif !important;
                                      text-decoration: none;
                                      padding: 13px 16px;
                                      color: #ffffff;
                                      display: inline-block;
                                      background-color: #003e64;
                                      mso-padding-alt: 0;
                                    "
                                    aria-label="${buttonText}"
                                    data-sap-hpa-ceimo-link-id="1747836879674823"
                                    data-sap-hpa-ceimo-link-outboundid="X"
                                    data-sap-hpa-ceimo-link-utm="X"
                                    data-sap-hpa-ceimo-link-trackable="X"
                                    data-sap-hpa-ceimo-link-alias="${buttonAlias}"
                                  >
                                    <!--[if mso]>
                                      <i
                                        style="
                                          letter-spacing: 25px;
                                          mso-font-width: -100%;
                                          mso-text-raise: 20pt;
                                        "
                                        >&nbsp;</i
                                      >
                                    <![endif]-->
                                    <span
                                      translate="yes"
                                      style="
                                        mso-text-raise: 10pt;
                                        color: #ffffff;
                                      "
                                      >${buttonText}</span
                                    >
                                    <!--[if mso]>
                                      <i
                                        style="
                                          letter-spacing: 25px;
                                          mso-font-width: -100%;
                                          mso-text-raise: 20pt;
                                        "
                                        >&nbsp;</i
                                      >
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
      </center>
    </div>
    <!--[if mso]></td></tr></table><![endif]-->`;
}

export function generateHTML(
  blocks: BlockData[],
  subjectLine: string,
  preheader: string,
  languageData?: LanguageData
): string {
  const contentBlocks = blocks.map(generateBlockHTML).join("\n");
  const subjectHTML = generateSubjectLineBlock(subjectLine || "");
  const preheaderHTML = generatePreheaderBlock(preheader || "");

  // Apply language-specific translations to header and footer
  let header = HEADER;
  let footer = FOOTER;

  console.log("🌍 Language Data in htmlGenerator:", languageData);

  if (languageData) {
    // Replace "Read online" text in header
    if (languageData.readOnline) {
      console.log(
        `  Replacing "Read online" with "${languageData.readOnline}"`
      );
      header = header
        .replace(/Read online &rsaquo;/g, `${languageData.readOnline} &rsaquo;`)
        .replace(
          /title="Read online &rsaquo;"/g,
          `title="${languageData.readOnline} &rsaquo;"`
        );
    }

    // Replace "Follow us" text in footer
    if (languageData.followUs) {
      console.log(`  Replacing "Follow us" with "${languageData.followUs}"`);
      footer = footer.replace(/Follow us</g, `${languageData.followUs}<`);
    }

    // Replace social media links in footer
    if (languageData.facebook) {
      console.log(`  Replacing Facebook URL with ${languageData.facebook}`);
      footer = footer.replace(
        /https:\/\/www\.facebook\.com\/BoschProfessionalPowerToolsUK/g,
        languageData.facebook
      );
    }
    if (languageData.instagram) {
      console.log(`  Replacing Instagram URL with ${languageData.instagram}`);
      footer = footer.replace(
        /https:\/\/www\.instagram\.com\/boschprouk\//g,
        languageData.instagram
      );
    }
    if (languageData.youtube) {
      console.log(`  Replacing YouTube URL with ${languageData.youtube}`);
      footer = footer.replace(
        /https:\/\/www\.youtube\.com\/user\/BoschProfessionalUK/g,
        languageData.youtube
      );
    }
  }

  return `${MASTER_TEMPLATE_START}
${subjectHTML}
${preheaderHTML}
${header}
${contentBlocks}
${footer}
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

export function generateHeaderPreviewHTML(languageData?: LanguageData): string {
  let header = HEADER;

  // Apply language-specific translations if provided
  if (languageData && languageData.readOnline) {
    header = header
      .replace(/Read online &rsaquo;/g, `${languageData.readOnline} &rsaquo;`)
      .replace(
        /title="Read online &rsaquo;"/g,
        `title="${languageData.readOnline} &rsaquo;"`
      );
  }

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
${header}
</body>
</html>`;
}

export function generateFooterPreviewHTML(languageData?: LanguageData): string {
  let footer = FOOTER;

  // Apply language-specific translations if provided
  if (languageData) {
    if (languageData.followUs) {
      footer = footer.replace(/Follow us</g, `${languageData.followUs}<`);
    }

    // Replace social media links
    if (languageData.facebook) {
      footer = footer.replace(
        /https:\/\/www\.facebook\.com\/BoschProfessionalPowerToolsUK/g,
        languageData.facebook
      );
    }
    if (languageData.instagram) {
      footer = footer.replace(
        /https:\/\/www\.instagram\.com\/boschprouk\//g,
        languageData.instagram
      );
    }
    if (languageData.youtube) {
      footer = footer.replace(
        /https:\/\/www\.youtube\.com\/user\/BoschProfessionalUK/g,
        languageData.youtube
      );
    }
  }

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
${footer}
</body>
</html>`;
}
