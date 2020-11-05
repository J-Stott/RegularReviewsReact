import React from "react";

import Page from "../../shared/components/Page";
import ContentWrapper from "../../shared/components/ContentWrapper";
import LegalSection from "../components/LegalSection";

import classes from "./Legal.module.css";
import { useTitle } from "../../hooks/title-hook";

const CookiesPage = (props) => {

  useTitle("Regular Reviews: Cookie Policy");

  return (
    <Page>
      <ContentWrapper>
        <div className={classes["content"]}>
          <h1>Cookie Policy</h1>
          <p>
            This cookie policy ("Policy") describes what cookies are and how
            Regular Reviews ("Regular Reviews", "we", "us" or "our") uses them
            on the regular-reviews.com website and any of its products or
            services (collectively, "Website" or "Services"). You should read
            this Policy so you can understand what type of cookies we use, the
            information we collect using cookies and how that information is
            used. It also describes the choices available to you regarding
            accepting or declining the use of cookies. For further information
            on how we use, store and keep your personal data secure, see our
            Privacy Policy.
          </p>

          <LegalSection
            heading="What are cookies?"
            section={`Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").

Session cookies are temporary cookies that are used during the course of your visit to the Website, and they expire when you close the web browser.

Persistent cookies are used to remember your preferences within our Website and remain on your desktop or mobile device even after you close your browser or restart your computer. They ensure a consistent and efficient experience for you while visiting our Website or using our Services.

Cookies may be set by the Website ("first-party cookies"), or by third parties, such as those who serve content or provide advertising or analytics services on the website ("third party cookies"). These third parties can recognize you when you visit our website and also when you visit certain other websites.`}
          />

          <h2>What type of cookies do we use?</h2>

          <LegalSection
            heading="Necessary cookies"
            section={`Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our Website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account to access the content.`}
          />

          <LegalSection
            heading="What are your cookie options?"
            section={`If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to delete cookies that have already been set and to not accept new cookies. Please note, however, that if you delete cookies or do not accept them, you might not be able to use all of the features our Website and Services offer.`}
          >
          <br/>
            <p>
              To learn more about cookies and how to manage them, visit{" "}
              <a href="http://internetcookies.org">internetcookies.org</a>
            </p>
          </LegalSection>

          <LegalSection
            heading="Changes and amendments"
            section={`We reserve the right to modify this Policy relating to the Website or Services at any time, effective upon posting of an updated version of this Policy on the Website. When we do we will revise the updated date at the bottom of this page. Continued use of the Website after any such changes shall constitute your consent to such changes.`}
          />

          <LegalSection
            heading="Acceptance of this policy"
            section={`You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the Website or its Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website and its Services.`}
          />

          <LegalSection
            heading="Contacting us"
            section={`If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to our use of cookies, you may send an email to regularreviewssite@gmail.com

This document was last updated on August 22nd, 2020`}
          />
        </div>
      </ContentWrapper>
    </Page>
  );
};

export default CookiesPage;
