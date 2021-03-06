import React from "react";

import Page from "../../shared/components/Page";
import ContentWrapper from "../../shared/components/ContentWrapper";
import LegalSection from "../components/LegalSection";

import classes from "./Legal.module.css";
import { useTitle } from "../../hooks/title-hook";

const TermsPage = (props) => {

  useTitle("Regular Reviews: Terms and Conditions");

  return (
    <Page>
      <ContentWrapper>
        <div className={classes["content"]}>
          <h1>Terms and Conditions</h1>
          <p>
            These terms and conditions ("Terms", "Agreement") are an agreement
            between Regular Reviews ("Regular Reviews", "us", "we" or "our") and
            you ("User", "you" or "your"). This Agreement sets forth the general
            terms and conditions of your use of the regular-reviews.com website
            and any of its products or services (collectively, "Website" or
            "Services").
          </p>

          <LegalSection
            heading="Accounts and membership"
            section="You must be at least 13 years of age to use this Website. By using this Website and by agreeing to this Agreement you warrant and represent that you are at least 13 years of age. If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration."
          />

          <LegalSection
            heading="User content"
            section={`We do not own any data, information or material ("Content") that you submit on the Website in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor and review Content on the Website submitted or created using our Services by you. Unless specifically permitted by you, your use of the Website does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.`}
          />

          <LegalSection
            heading="Backups"
            section={`We perform regular backups of the Website and Content and will do our best to ensure completeness and accuracy of these backups. In the event of the hardware failure or data loss we will restore backups automatically to minimize the impact and downtime.`}
          />

          <LegalSection
            heading="Links to other websites"
            section={`Although this Website may link to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. Some of the links on the Website may be "affiliate links". This means if you click on the link and purchase an item, Regular Reviews will receive an affiliate commission. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any website which you access through a link from this Website. Your linking to any other off-site websites is at your own risk.`}
          />

          <LegalSection
            heading="Prohibited uses"
            section={`In addition to other terms as set forth in the Agreement, you are prohibited from using the Website or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.`}
          />

          <LegalSection
            heading="Intellectual property rights"
            section={`This Agreement does not transfer to you any intellectual property owned by Regular Reviews or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Regular Reviews. All trademarks, service marks, graphics and logos used in connection with our Website or Services, are trademarks or registered trademarks of Regular Reviews or Regular Reviews licensors. Other trademarks, service marks, graphics and logos used in connection with our Website or Services may be the trademarks of other third-parties. Your use of our Website and Services grants you no right or license to reproduce or otherwise use any Regular Reviews or third-party trademarks.`}
          />

          <LegalSection
            heading="Limitation of liability"
            section={`To the fullest extent permitted by applicable law, in no event will Regular Reviews, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Regular Reviews has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Regular Reviews and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Regular Reviews for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.`}
          />

          <LegalSection
            heading="Indemnification"
            section={`You agree to indemnify and hold Regular Reviews and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Website or Services or any willful misconduct on your part.`}
          />

          <LegalSection
            heading="Severability"
            section={`All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.`}
          />

          <LegalSection
            heading="Changes and amendments"
            section={`We reserve the right to modify this Agreement or its policies relating to the Website or Services at any time, effective upon posting of an updated version of this Agreement on the Website. When we do, we will revise the updated date at the bottom of this page. Continued use of the Website after any such changes shall constitute your consent to such changes.`}
          />

          <LegalSection
            heading="Acceptance of these terms"
            section={`You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Website or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Website and its Services.`}
          />

          <LegalSection
            heading="Contacting us"
            section={`If you would like to contact us to understand more about this Agreement or wish to contact us concerning any matter relating to it, you may send an email to regularreviewssite@gmail.com

This document was last updated on August 22nd, 2020`}
          />
        </div>
      </ContentWrapper>
    </Page>
  );
};

export default TermsPage;
