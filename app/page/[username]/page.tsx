"use client";

import React, { use } from "react";
import PublicPage from "../../_components/PublicPage";
import { usePage } from "../../_state/PageContext";
import { findExampleByUsername } from "../../_lib/examples";

export default function PublicRoute({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const { data } = usePage();

  // If the current user's dashboard state matches this username, show that.
  // Otherwise, look up an example page by username (for demo links).
  let page = data;
  if (data.profile.username !== username) {
    const ex = findExampleByUsername(username);
    if (ex) page = ex;
  }

  return (
    <PublicPage
      profile={page.profile}
      links={page.links}
      appearance={page.appearance}
      payments={page.payments}
      animate={true}
      interactive={true}
    />
  );
}
