import Image from "next/image";
import Link from "next/link";
import { Add, Chain, Feed, Group, Pen, Twitter, Check } from "~/svgs";
import React, { type FC } from "react";
import type { DetailedTag } from "~/types";

interface TagPageHeaderProps {
  tagDetails: DetailedTag;
  following: boolean;
  followTag: (name: string) => Promise<void>;
}

const TagPageHeader: FC<TagPageHeaderProps> = ({
  tagDetails,
  following,
  followTag,
}) => {
  return (
    <header className="mb-4 flex flex-col items-center justify-center rounded-md border border-border-light bg-white px-6 py-11 text-center dark:border-border dark:bg-primary">
      <div className="flex gap-2">
        {tagDetails.logo && (
          <Image
            src={tagDetails.logo}
            alt={tagDetails.slug}
            width={50}
            height={50}
            className="h-16 w-16 rounded-md object-cover"
          />
        )}
        <div
          className={`mb-5 ${tagDetails.logo ? "text-left" : "text-center"}`}
        >
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-text-secondary">
            {tagDetails.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-text-primary">
            #{tagDetails.slug}
          </p>
        </div>
      </div>
      <div className="mb-3 flex flex-col items-center gap-4 md:flex-row">
        <button
          onClick={() => void followTag(tagDetails.name)}
          className="btn-outline flex w-full items-center justify-center gap-2 text-secondary md:w-max"
        >
          {following ? (
            <>
              <Check className="h-5 w-5 fill-secondary" />
              <span>Following</span>
            </>
          ) : (
            <>
              <Add className="h-5 w-5 fill-secondary" />
              <span>Follow Tag</span>
            </>
          )}
        </button>
        <Link href={`/new?tag=${tagDetails.name}`}>
          <button className="btn-filled flex w-full items-center gap-2 text-white md:w-max">
            <Pen className="h-5 w-5 fill-white" />
            Write An Article
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-4 text-gray-700 dark:text-text-secondary">
          <Group className="h-5 w-5 fill-gray-700 dark:fill-text-secondary" />
          <span className="flex items-center gap-1">
            <span>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+tagDetails.followersCount)}
            </span>
            <span>Followers</span>
          </span>
        </div>
        <span className="text-gray-700 dark:text-text-secondary">·</span>
        <div className="flex items-center gap-4 text-gray-700 dark:text-text-secondary">
          <Feed className="h-5 w-5 fill-gray-700 dark:fill-text-secondary" />
          <span className="flex items-center gap-1">
            <span>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(+tagDetails.articlesCount)}
            </span>
            <span>Articles</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${
              process.env.NEXT_PUBLIC_VERCEL_URL as string
            }/tag/${tagDetails.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-icon-large flex">
              <Twitter className="h-5 w-5 fill-gray-700 dark:fill-text-secondary" />
            </button>
          </a>
          <button
            className="btn-icon-large flex"
            onClick={() =>
              void navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_VERCEL_URL as string}/tag/${
                  tagDetails.slug
                }`
              )
            }
          >
            <Chain className="h-5 w-5 fill-gray-700 dark:fill-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TagPageHeader;
