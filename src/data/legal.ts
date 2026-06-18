/**
 * Legal copy transcribed VERBATIM from the live public BoostMySkills pages:
 *   Privacy  -> https://boostmyskills.eu/privacy
 *   Cookies  -> https://boostmyskills.eu/cookie_policy
 *   Terms    -> https://boostmyskills.eu/tos
 *
 * Content lives here (not inside the page components) so the legal pages stay
 * declarative and the wording has a single source of truth. The text is a
 * word-for-word transcription of the live pages; the only edits are two clear
 * typo fixes noted inline in the Terms document (a stray "]" bracket). Bold
 * lead-in labels and section headings from the live markup are preserved.
 */

export interface LegalBlock {
  type: "paragraph" | "list" | "group";
  /** Optional bold lead-in rendered before `text` (mirrors the live <b> tags). */
  label?: string;
  /** For paragraph blocks. */
  text?: string;
  /** For list blocks, and for the tight lines of a `group` block. */
  items?: string[];
}

export interface LegalSection {
  /** Omitted for the un-titled intro block (e.g. the Cookie Policy preamble). */
  heading?: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  sections: LegalSection[];
}

const p = (text: string): LegalBlock => ({ type: "paragraph", text });
const labelled = (label: string, text: string): LegalBlock => ({
  type: "paragraph",
  label,
  text,
});
const list = (items: string[]): LegalBlock => ({ type: "list", items });
// A bold heading + its detail lines rendered tightly together (e.g. the live
// Cookie Policy entity blocks: name, "Type or Function", "Server", consent).
const group = (label: string, lines: string[]): LegalBlock => ({
  type: "group",
  label,
  items: lines,
});

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        p(
          'Welcome to BoostMySkills ("we", "us", "our"). We provide micro-programmes and micro-credentials in sustainability, renewable energy, smart urban solutions, etc. Through this Privacy Policy, we explain what personal data we collect from you, why we collect it, how we use it, how we protect it, and your rights under applicable data protection laws, including the EU GDPR.',
        ),
      ],
    },
    {
      heading: "2. Who we are / Contact information",
      blocks: [
        p(
          "Organisation: boostmyskills.eu - supported by our partners as listed on the BoostMySkills homepage.",
        ),
        p("Email: info@boostmyskills.eu"),
      ],
    },
    {
      heading: "3. Scope",
      blocks: [
        p(
          "This policy applies whenever you use our website(s), register for courses, sign up for newsletters, use self-assessment tools, contact us through forms, or otherwise provide personal data to us. It covers users located in the European Economic Area (EEA), Switzerland, and any other jurisdictions where we process personal data.",
        ),
      ],
    },
    {
      heading: "4. What data we collect",
      blocks: [
        p("We may collect the following categories of personal data:"),
        labelled(
          "Account / Registration Data:",
          "Name, username email address, password, country of residence. Source: You, when you create an account or sign up. Purpose: To provide access to courses, manage your account, send you course-related notifications.",
        ),
        labelled(
          "Course participation data:",
          "Which micro-programmes / micro-credentials you enrol in, progress, completion, assessments. Source: From you, via platform usage. Purpose: To deliver the learning services, manage certificates, track progress, quality assurance.",
        ),
        labelled(
          "Newsletter / Communication data:",
          "Email, possibly name. Source: You, when you subscribe. Purpose: To send you newsletters, announcements, updates, and other relevant information.",
        ),
        labelled(
          "Technical / Usage Data:",
          "IP address, device / browser type, operating system, pages visited, time spent, cookies, analytics data. Source: Automatically, via website / platform tools. Purpose: For website performance, improving user experience, diagnosing errors, analytics.",
        ),
        labelled(
          "Cookies and tracking:",
          "Cookies (first-party and third-party), tracking pixels, similar trackers. Source: Automatically. Purpose: To manage sessions, for analytics, for social media sharing and embedding, etc.",
        ),
      ],
    },
    {
      heading: "5. Legal basis for processing",
      blocks: [
        p("We rely on one or more of the following legal bases:"),
        labelled(
          "Consent",
          "— Where required (for cookies, newsletter sign-ups, etc.), we ask for your consent.",
        ),
        labelled(
          "Performance of a contract / legitimate interest",
          "— To deliver the educational services, manage user accounts, send service-related communications.",
        ),
        labelled("Legal obligation", "— To comply with laws."),
      ],
    },
    {
      heading: "6. How we use your data",
      blocks: [
        p("The data we collect is used for:"),
        list([
          "Providing, maintaining, and improving our platform and your user experience",
          "Processing your enrolments, granting certificates, tracking your course progress",
          "Communicating with you (e.g. course info, platform changes, newsletters)",
          "Security, fraud prevention, and ensuring integrity of our services",
          "Analytics to understand usage patterns and improve services",
          "Compliance with legal requirements",
        ]),
      ],
    },
    {
      heading: "7. Sharing your data / third parties",
      blocks: [
        p("We may share your personal data with:"),
        labelled(
          "Service providers:",
          "e.g. hosting providers, email/newsletter services, analytics tools, payment or accreditation bodies (if relevant).",
        ),
        labelled(
          "Partners / educational institutions:",
          "e.g. when courses are co-delivered, or accreditation is involved (for example Maynooth University, etc.).",
        ),
        labelled(
          "Legal / regulatory authorities:",
          "where required by law or to protect our rights.",
        ),
      ],
    },
    {
      heading: "8. International transfers",
      blocks: [
        p(
          "If any of the third parties or service providers are outside the EEA (or in a country without an adequacy decision from the EU), we ensure that appropriate protections are used.",
        ),
      ],
    },
    {
      heading: "9. Data retention",
      blocks: [
        p(
          "We retain your personal data only for as long as necessary for the purposes set out in this policy, plus:",
        ),
        list([
          "any periods needed to comply with legal obligations (e.g. record keeping, audits)",
          "after you stop using our services, for as long as needed for record-keeping, resolving disputes, enforcing agreements, or responding to legal requests",
        ]),
        p("When data is no longer needed, we securely delete or anonymise it."),
      ],
    },
    {
      heading: "10. Cookies and tracking technologies",
      blocks: [
        p(
          "We use cookies and other tracking technologies. Some are essential for website function, others are for analytics or third-party services. We provide a cookie / tracker banner and/or settings so you can consent or decline non-essential trackers. You can also manage cookies via your browser.",
        ),
      ],
    },
    {
      heading: "11. Your rights",
      blocks: [
        p("Under GDPR and related laws, you have rights, including:"),
        list([
          "Right to access your personal data;",
          "Right to correct inaccurate or incomplete data;",
          "Right to erase your data (right to be forgotten), under certain circumstances;",
          "Right to restrict or object to certain processing;",
          "Right to data portability;",
          "Right to withdraw consent (for processing based on consent);",
          "Right to lodge a complaint with a supervisory authority.",
        ]),
        p(
          "To exercise these rights, contact us using the contact details above. We may need to verify your identity. We'll respond without undue delay, generally within one month (or longer if permitted by law).",
        ),
      ],
    },
    {
      heading: "12. Security",
      blocks: [
        p(
          "We take reasonable technical and organisational measures to protect your data, including encryption where appropriate, securing servers, limiting access rights, regular reviews of security practices. However, no system is 100% secure; we cannot guarantee absolute security, so please take care with your passwords, etc.",
        ),
      ],
    },
    {
      heading: "13. Changes to this policy",
      blocks: [
        p(
          "We may update this Privacy Policy from time to time (for example, if our practices change, or laws are updated). It is your responsibility to check this Privacy Policy periodically for changes. Your continued use of the Website following the posting of any changes constitutes acceptance of those changes.",
        ),
      ],
    },
    {
      heading: "14. Contact us",
      blocks: [
        p(
          "If you have any questions, or want to exercise your rights, you can reach us at:",
        ),
        p("info@boostmyskills.eu"),
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  sections: [
    {
      // Intro preamble (no heading on the live page).
      blocks: [
        p(
          "This document informs Users about the technologies that help this Website to achieve the purposes described below. Such technologies allow BoostMySkills to access and store information (for example by using a Cookie) or use resources (for example by running a script) on a User's device as they interact with this Website.",
        ),
        p(
          'For simplicity, all such technologies are defined as "Trackers" within this document — unless there is a reason to differentiate. For example, while Cookies can be used on both web and mobile browsers, it would be inaccurate to talk about Cookies in the context of mobile apps as they are a browser-based Tracker. For this reason, within this document, the term Cookies is only used where it is specifically meant to indicate that particular type of Tracker. Some of the purposes for which Trackers are used may also require the User\'s consent.',
        ),
        p(
          'Whenever consent is given, it can be freely withdrawn at any time following the instructions provided in this document. This Website uses Trackers managed directly by BoostMySkills (so-called "first-party" Trackers) and Trackers that enable services provided by a third-party (so-called "third-party" Trackers). Unless otherwise specified within this document, third-party providers may access the Trackers managed by them. The validity and expiration periods of Cookies and other similar Trackers may vary depending on the lifetime set by BoostMySkills or the relevant provider. Some of them expire upon termination of the User\'s browsing session. This Website uses cookies that store and retrieve information when the user browses.',
        ),
        p(
          "In general, these technologies can serve very diverse purposes such as, for example, recognizing the user, obtaining information about their browsing habits or customizing the way the content is displayed. The specific uses made of these technologies are described below.",
        ),
      ],
    },
    {
      heading: "What type of cookies are used on this Website and for what purpose?",
      blocks: [
        p(
          "This Website uses its own and third party cookies. Own cookies: are those that are sent to the user's terminal equipment from a computer or domain managed by the website Owner and from which the service requested by the user is provided.",
        ),
        p(
          "Third-party cookies: are those that are sent to the user's terminal equipment from a computer or domain that is not managed by the publisher, but by another entity that processes the data obtained through cookies.",
        ),
        p("This Website uses the following cookies for the purposes described below:"),
        labelled(
          "Technical:",
          "cookies used on this Website by BoostMySkills and, where appropriate, by third parties, which allow the user to browse the Site and use the different services provided therein, including those that allow the management and operation of the website and its functions, such as the identification of sessions, traffic, security during navigation and the storage of content for dissemination and publication, such as videos, or to share through social networks. These cookies are necessary.",
        ),
        labelled(
          "Analytics:",
          "cookies used on this Website by the Owner and by third parties, which allow the quantification of the number of users who visit the Site and perform statistical measurements and analysis of the use made by users of the content and services offered on the website. To do this, navigation on the Website is analyzed in order to improve the offer of content, services and products offered and correct the structure of the Website to improve the way of browsing it.",
        ),
        labelled(
          "External social networks:",
          "cookies used on this Website by the owners of the social networks to be able to interact with the different social platforms (e.g YouTube, LinkedIn or others) configured on this Website and / or by the own user of these social networks.",
        ),
      ],
    },
    {
      heading: "Who uses cookies on this Website?",
      blocks: [
        p("The following entities use the cookies described below for these purposes:"),
        group("BoostMySkills", [
          "Type or Function: Technical",
          "Server: https://boostmyskills.eu/",
          "These cookies are necessary and therefore are excluded from the duty to obtain the user's consent.",
        ]),
        group("Linkedin", [
          "Type or Function: External social networks",
          "Server: http://www.linkedin.com",
          "These cookies are not excluded from the duty to obtain consent, so the user must authorize their use.",
        ]),
      ],
    },
    {
      heading: "How are the cookies on this Website accepted, rejected, revoked, or limited?",
      blocks: [
        p(
          "Through the different options included in the notice of the use of cookies that is displayed when accessing this Website for the first time, the user can accept or reject the use of cookies on this Site and the international transfer of their data.",
        ),
        p("For these purposes:"),
        p("To accept all cookies: you must click on the ACCEPT COOKIES button."),
        p(
          "To configure cookies: you must click on the CONFIGURE button and you will be able to access the types of cookies that can be accepted or rejected. Necessary cookies cannot be rejected.",
        ),
        labelled(
          "Transfers:",
          "By accepting cookies from Google, Inc, the user also accepts the international transfer of their personal data to the United States as reported in the following section.",
        ),
        p(
          "To revoke the consent granted: the cookies must be eliminated as indicated below.",
        ),
        p(
          "Locating Tracker Settings - users can, for example, find information about how to manage Cookies in the most commonly used browsers at the websites of the following:",
        ),
        list([
          "Google Chrome",
          "Mozilla Firefox",
          "Apple Safari",
          "Microsoft Internet Explorer",
          "Microsoft Edge",
          "Brave",
        ]),
      ],
    },
    {
      heading: "Are international data transfers made from this Website?",
      blocks: [
        p(
          "Yes. The following third-party publisher carries out international transfers of data derived from cookies from this Website: Google, Inc. transfers data to the United States based on this adequacy, guarantee or exception decision: User consent when accepting cookies by clicking the ACCEPT COOKIES button.",
        ),
        p(
          "When the user has accepted the use of cookies, they will be consenting that their data, collected through the loading and reading of cookies, be transferred to the United States, a country that currently does not offer an adequate level of protection according to the European Commission. Therefore, if the user does not consent to this international transfer of their data to the United States, when accessing this Website for the first time and viewing the notice of the use of cookies, they must press the CONFIGURATION button to access the types of cookies that can be accepted or rejected.",
        ),
        p(
          "If cookies are rejected, the functionalities or services offered through the use of these cookies will not be provided or obtained.",
        ),
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  // Live page H1 reads "Website Terms and Conditions".
  title: "Website Terms and Conditions",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        p(
          'Welcome to BoostMySkills ("the Website"). These Terms and Conditions govern your use of the Website and the services provided by BoostMySkills ("we," "us," or "our"), including but not limited to online training courses, tutorials, and educational materials. By accessing or using our Website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our Website.',
        ),
      ],
    },
    {
      heading: "2. Eligibility",
      blocks: [
        p(
          "By using this Website, you represent and warrant that you are at least 18 years old or are accessing the Website under the supervision of a parent or guardian. You agree to comply with all applicable laws and regulations regarding your use of the Website.",
        ),
      ],
    },
    {
      heading: "3. Account Registration",
      blocks: [
        p(
          "To access certain features of the Website, you will be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary. You are responsible for safeguarding your account credentials and for any activities or actions under your account.",
        ),
      ],
    },
    {
      heading: "4. Use of the Website",
      blocks: [
        p(
          "You agree to use the Website only for lawful purposes. You must not use the Website in any way that:",
        ),
        list([
          "Violates any applicable local, national, or international law or regulation.",
          "Is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.",
          "Attempts to gain unauthorized access to the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.",
          "Harms or attempts to harm minors in any way.",
        ]),
      ],
    },
    {
      heading: "5. Intellectual Property Rights",
      blocks: [
        p(
          "All content included on the Website, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of BoostMySkill's content suppliers and is protected by international copyright laws. The compilation of all content on this Website is the exclusive property of BoostMySkills contributors and protected by international copyright laws. You may not copy, reproduce, republish, upload, post, transmit, or distribute any content from the Website in any way without our prior written permission. You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Website for personal, non-commercial purposes.",
        ),
      ],
    },
    {
      heading: "6. Course Enrollment and Access",
      blocks: [
        p(
          "When you access a course from the Website, you are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the course for your personal, non-commercial use. This license is subject to these Terms and Conditions and the course-specific terms that may be presented at the time of purchase.",
        ),
        p(
          "Courses are delivered through online streaming and are not downloadable unless explicitly stated. Access to courses may be time-limited, and access may be revoked if these Terms and Conditions are violated.",
        ),
      ],
    },
    {
      heading: "7. Payment and Refunds",
      blocks: [p("Courses are offered free-of-charge.")],
    },
    {
      heading: "8. User-Generated Content",
      blocks: [
        p(
          "Where users can post content on the Website, such as comments, reviews, or forum posts. By posting content, you grant BoostMySkills a worldwide, perpetual, irrevocable, royalty-free, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform that content in connection with the Website and our business.",
        ),
        p("You represent and warrant that:"),
        list([
          "You own or have the necessary rights to use and authorize us to use all intellectual property rights in any content that you post.",
          "Your content does not infringe any third party's intellectual property rights, privacy, publicity, or other personal or proprietary rights.",
          "Your content is not defamatory, libelous, obscene, hateful, or otherwise unlawful.",
        ]),
      ],
    },
    {
      heading: "9. Termination",
      blocks: [
        p(
          "We reserve the right to terminate or suspend your account and access to the Website, with or without notice, for any reason, including but not limited to breach of these Terms and Conditions.",
        ),
      ],
    },
    {
      heading: "10. Disclaimers and Limitation of Liability",
      blocks: [
        p(
          'The Website and the services provided are provided on an "as is" and "as available" basis. We do not warrant that the Website will be uninterrupted, secure, or error-free.',
        ),
        p(
          "To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to, implied warranties of merchantability and fitness for a particular purpose. We do not warrant that the Website, content, or services will meet your requirements.",
        ),
        p(
          "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of, or inability to access or use, the Website.",
        ),
      ],
    },
    {
      heading: "11. Indemnification",
      blocks: [
        p(
          "You agree to defend, indemnify, and hold harmless BoostMySkills' affiliates, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:",
        ),
        list([
          "Your use of and access to the Website;",
          "Your violation of any term of these Terms and Conditions;",
          "Your violation of any third-party right, including without limitation any intellectual property, privacy, or other personal or proprietary right.",
        ]),
      ],
    },
    {
      heading: "12. Governing Law and Jurisdiction",
      blocks: [
        // NOTE: the live page has a stray "]" after "Ireland" ("...within Ireland],
        // for the purpose..."). Removed as a clear typo per the brief.
        p(
          "These Terms and Conditions shall be governed by and construed in accordance with the laws of Ireland, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located within Ireland, for the purpose of litigating all such claims or disputes.",
        ),
      ],
    },
    {
      heading: "13. Changes to the Terms and Conditions",
      blocks: [
        p(
          "We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. Any changes will be effective immediately upon posting on the Website. It is your responsibility to check these Terms and Conditions periodically for changes. Your continued use of the Website following the posting of any changes constitutes acceptance of those changes.",
        ),
      ],
    },
    {
      heading: "14. Contact Information",
      blocks: [
        p(
          "If you have any questions about these Terms and Conditions, please contact us.",
        ),
      ],
    },
  ],
};
