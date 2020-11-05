import React from "react";

import Page from "../../shared/components/Page";
import ContentWrapper from "../../shared/components/ContentWrapper";
import LegalSection from "../components/LegalSection";

import classes from "./Legal.module.css";
import { useTitle } from "../../hooks/title-hook";

const PrivacyPage = (props) => {

  useTitle("Regular Reviews: Privacy Policy");

  return (
    <Page>
      <ContentWrapper>
        <div className={classes["content"]}>
          <h1>Privacy Policy</h1>
          <p>
            This privacy policy ("Policy") describes how Regular Reviews
            ("Regular Reviews", "we", "us" or "our") collects, protects and uses
            the personally identifiable information ("Personal Information") you
            ("User", "you" or "your") may provide on the regular-reviews.com
            website and any of its products or services (collectively, "Website"
            or "Services"). It also describes the choices available to you
            regarding our use of your Personal Information and how you can
            access and update this information. This Policy does not apply to
            the practices of companies that we do not own or control, or to
            individuals that we do not employ or manage.
          </p>

          <LegalSection
            heading="Automatic collection of information"
            section="When you visit the Website our servers automatically record information that your browser sends. This data may include information such as your device's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics."
          />

          <LegalSection
            heading="Collection of personal information"
            section="You can visit the Website without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the Website's features, you will be asked to provide certain Personal Information (for example, your e-mail address and an identifiable username). We receive and store any information you knowingly provide to us when you create an account, publish content, or fill any online forms on the Website. When required, this information may include your email address, name, or other Personal Information. You can choose not to provide us with your Personal Information, but then you may not be able to take advantage of some of the Website's features. Users who are uncertain about what information is mandatory are welcome to contact us."
          />

          <LegalSection
            heading="Managing personal information"
            section="You are able to access, add to, update and delete certain Personal Information about you. The information you can view, update, and delete may change as the Website or Services change. When you update information, however, we may maintain a copy of the unrevised information in our records. Some information may remain in our private records after your deletion of such information from your account. We will retain and use your Personal Information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after the expiration of the retention period."
          />

          <LegalSection
            heading="Use and processing of collected information"
            section={`Any of the information we collect from you may be used to personalize your experience; improve our Website; improve customer service and respond to queries and emails of our customers; send notification emails such as password reminders, updates, etc; run and operate our Website and Services. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.

We may process Personal Information related to you if one of the following applies: (i) You have given your consent for one or more specific purposes. Note that under some legislations we may be allowed to process information until you object to such processing (by opting out), without having to rely on consent or any other of the following legal bases below. This, however, does not apply, whenever the processing of Personal Information is subject to European data protection law; (ii) Provision of information is necessary for the performance of an agreement with you and/or for any pre-contractual obligations thereof; (iii) Processing is necessary for compliance with a legal obligation to which you are subject; (iv) Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us; (v) Processing is necessary for the purposes of the legitimate interests pursued by us or by a third party. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.`}
          />

          <LegalSection
            heading="Information transfer and storage"
            section="Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information. If any such transfer takes place, you can find out more by checking the relevant sections of this document or inquire with us using the information provided in the contact section."
          />

          <LegalSection
            heading="The rights of users"
            section="You may exercise certain rights regarding your information processed by us. In particular, you have the right to do the following: (i) you have the right to withdraw consent where you have previously given your consent to the processing of your information; (ii) you have the right to object to the processing of your information if the processing is carried out on a legal basis other than consent; (iii) you have the right to learn if information is being processed by us, obtain disclosure regarding certain aspects of the processing and obtain a copy of the information undergoing processing; (iv) you have the right to verify the accuracy of your information and ask for it to be updated or corrected; (v) you have the right, under certain circumstances, to restrict the processing of your information, in which case, we will not process your information for any purpose other than storing it; (vi) you have the right, under certain circumstances, to obtain the erasure of your Personal Information from us; (vii) you have the right to receive your information in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that your information is processed by automated means and that the processing is based on your consent, on a contract which you are part of or on pre-contractual obligations thereof."
          />

          <LegalSection
            heading="The right to object to processing"
            section="Where Personal Information is processed for the public interest, in the exercise of an official authority vested in us or for the purposes of the legitimate interests pursued by us, you may object to such processing by providing a ground related to your particular situation to justify the objection. You must know that, however, should your Personal Information be processed for direct marketing purposes, you can object to that processing at any time without providing any justification. To learn, whether we are processing Personal Information for direct marketing purposes, you may refer to the relevant sections of this document."
          />

          <LegalSection
            heading="How to exercise these rights"
            section="Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible."
          />

          <LegalSection
            heading="Privacy of children"
            section="We do not knowingly collect any Personal Information from children under the age of 13. If you are under the age of 13, please do not submit any Personal Information through our Website or Service. We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through our Website or Service without their permission. If you have reason to believe that a child under the age of 13 has provided Personal Information to us through our Website or Service, please contact us. You must also be at least 16 years of age to consent to the processing of your Personal Information in your country (in some countries we may allow your parent or guardian to do so on your behalf)."
          />

          <LegalSection
            heading="Cookies"
            section={`The Website uses "cookies" to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. We may use cookies to collect, store, and track information for statistical purposes to operate our Website and Services. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the features of the Website and Services.`}
          >
          <br/>
          <p>To learn more about cookies and how to manage them, visit <a href="http://internetcookies.org">internetcookies.org</a></p>
          </LegalSection>

          <LegalSection
            heading="Do Not Track signals"
            section={`Some browsers incorporate a Do Not Track feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these purposes, tracking refers to collecting personally identifiable information from consumers who use or visit a website or online service as they move across different websites over time. Our Website does not track its visitors over time and across third party websites. However, some third party sites may keep track of your browsing activities when they serve you content, which enables them to tailor what they present to you.`}
          />

          <LegalSection
            heading="Affiliates"
            section={`We may disclose information about you to our affiliates for the purpose of being able to offer you related or additional products and services. Any information relating to you that we provide to our affiliates will be treated by those affiliates in accordance with the terms of this Privacy Policy.`}
          />

          <LegalSection
            heading="Links to other websites"
            section={`Our Website contains links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other websites or third-parties. We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information. Information security

We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and our Website cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third-party, despite best efforts.`}
          />

          <LegalSection
            heading="Data breach"
            section={`In the event we become aware that the security of the Website has been compromised or users Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the breach or if notice is otherwise required by law. When we do, we will send you an email.`}
          />

          <LegalSection
            heading="Legal disclosure"
            section={`In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account, and Personal Information will likely be among the assets transferred.`}
          />

          <LegalSection
            heading="Changes and amendments"
            section={`We may update this Privacy Policy from time to time in our discretion and will notify you of any material changes to the way in which we treat Personal Information. When changes are made, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways in our discretion, such as through contact information you have provided. Any updated version of this Privacy Policy will be effective immediately upon the posting of the revised Privacy Policy unless otherwise specified. Your continued use of the Website or Services after the effective date of the revised Privacy Policy (or such other act specified at that time) will constitute your consent to those changes. However, we will not, without your consent, use your Personal Data in a manner materially different than what was stated at the time your Personal Data was collected.`}
          />

          <LegalSection
            heading="Acceptance of this policy"
            section={`You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the Website or its Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website and its Services.`}
          />

          <LegalSection
            heading="Contacting us"
            section={`If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to regularreviewssite@gmail.com

This document was last updated on August 22nd, 2020`}
          />
        </div>
      </ContentWrapper>
    </Page>
  );
};

export default PrivacyPage;
