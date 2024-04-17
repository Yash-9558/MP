import React from "react";
import classes from "./index.module.css";
import Heading from "../Heading";
function About() {
  return (
    <div className={classes["about-container"]}>
      <Heading title="About US" />
      <div className={`${classes["container-content"]} ${classes["column"]}`}>
        <div className={classes["content-details"]}>
          <h2 className={classes["heading-secondary"]}>About BookStore</h2>
          <div className={classes["divider"]} />
          <p className={classes["container-text"]}>
            Welcome to E-Bookstore Name, where our passion for books meets the
            joy of reading!
          </p>
        </div>
        <div className={classes["content-details"]}>
          <h2 className={classes["heading-secondary"]}>Our Story</h2>
          <div className={classes["divider"]} />
          <p className={classes["container-text"]}>
            E-Bookstore Name was founded in [Year of Establishment] with a
            simple yet profound mission: to foster a love for literature and
            provide a haven for book enthusiasts of all ages. What began as a
            small independent bookstore has blossomed into a cherished community
            hub, where bibliophiles gather to discover new stories, share
            literary experiences, and celebrate the written word. Our journey
            started with a humble storefront in the heart of [Your City], where
            book lovers could escape into a world of imagination and creativity.
            With a carefully curated selection of books spanning various genres
            and interests, we quickly became a beloved destination for readers
            seeking inspiration and connection.
          </p>
          <p className={classes["container-text"]}>
            Over the years, we've grown and evolved, expanding our offerings and
            embracing new technologies to better serve our customers. From
            hosting author signings and book clubs to launching our online
            store, we're committed to staying at the forefront of the literary
            community while preserving the warmth and intimacy of a traditional
            bookstore.
          </p>
          <p className={classes["container-text"]}>
            Today, E-Bookstore Name stands as a testament to the enduring power
            of stories and the enduring bonds that unite us through the written
            word. We're grateful for the support of our loyal customers, the
            dedication of our passionate team, and the vibrant literary
            ecosystem that surrounds us. As we continue our journey, we remain
            steadfast in our mission to inspire, educate, and delight readers of
            all ages, one book at a time.
          </p>
        </div>
        <div className={classes["content-details"]}>
          <h2 className={classes["heading-secondary"]}>Our Philosophy</h2>
          <div className={classes["divider"]} />
          <p className={classes["container-text"]}>
            At E-Bookstore Name, we believe that books have the power to
            inspire, educate, and transform lives. That's why we're dedicated to
            curating a diverse and thoughtfully selected collection that
            reflects the richness and diversity of human experience. From
            timeless classics to contemporary bestsellers, from fiction to
            non-fiction, from children's books to scholarly works, we strive to
            offer something for every reader.
          </p>
        </div>

        <div className={classes["content-details"]}>
          <h2 className={classes["heading-secondary"]}>Visit Us</h2>
          <div className={classes["divider"]} />
          <p className={classes["container-text"]}>
            Located in the heart of [Your City], our cozy bookstore invites you
            to step inside, browse our shelves, and lose yourself in the magic
            of storytelling. Whether you're seeking literary inspiration,
            looking for the perfect gift, or simply craving a quiet escape from
            the hustle and bustle of daily life, we invite you to make yourself
            at home in our welcoming space.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
