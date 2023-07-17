import { url } from "@/constants";
export const fetchPromoted = fetch(`${url}/items?promoted=promoted`);
export async function getProduct({ slug }: { slug: string }) {
  return fetch(`${url}/items?slug=${slug}`, {
    next: {
      revalidate: 60 * 5,
      tags: [`${slug}`],
    },
  }).then((res) => res.json());
}
export async function getCategories() {
  return fetch(`${url}/category?parents=${true}`, {
    next: {
      revalidate: 60 * 5,
      tags: ["categories"],
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getPromoted(promoted: string) {
  return fetch(`${url}/items?promoted=${promoted}`, {
    next: {
      revalidate: 60 * 5,
      tags: ["promoted"],
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
export async function getPromotedDealers() {
  return fetch(`${url}/business?promoted=${true}`, {
    next: {
      revalidate: 60 * 5,
      tags: ["promotedDealers"],
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
export async function getAllDealers() {
  return fetch(`${url}/business`, {
    next: {
      revalidate: 60 * 5,
      tags: ["dealers"],
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
