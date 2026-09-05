import type { NormalizedProfile } from "@/types";
export function normalizeCodeforces(user: any, rating: any[] = [], submissions: any[] = []): NormalizedProfile {
  const solved = new Set(submissions.filter(item => item.verdict === "OK").map(item => `${item.problem?.contestId}:${item.problem?.index}`));
  return { platformId:"codeforces", externalId:user.handle, displayName:user.handle, profileUrl:`https://codeforces.com/profile/${encodeURIComponent(user.handle)}`, sourceUpdatedAt:new Date().toISOString(), metrics:[
    {id:"rating",label:"Rating",value:user.rating || 0},{id:"max-rating",label:"Max rating",value:user.maxRating || 0},{id:"contests",label:"Rated contests",value:rating.length},{id:"solved",label:"Solved problems in fetched submissions",value:solved.size}
  ],series:[{id:"rating",label:"Rating history",points:rating.map(item=>({timestamp:new Date(item.ratingUpdateTimeSeconds*1000).toISOString(),value:item.newRating}))}] };
}
