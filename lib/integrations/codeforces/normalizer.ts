import type { NormalizedProfile } from "@/types";
export interface CodeforcesUser { [key: string]: unknown; handle: string; rating?: number; maxRating?: number; }
export interface CodeforcesRating { [key: string]: unknown; ratingUpdateTimeSeconds?: number; newRating?: number; }
export interface CodeforcesSubmission { [key: string]: unknown; verdict?: string; programmingLanguage?: string; creationTimeSeconds?: number; problem?: { contestId?: number; index?: string; rating?: number; tags?: string[]; }; }
export interface NormalizedCodeforcesData { user: CodeforcesUser; rating: CodeforcesRating[]; submissions: CodeforcesSubmission[]; }

export function normalizeCodeforces(user: CodeforcesUser, rating: CodeforcesRating[] = [], submissions: CodeforcesSubmission[] = []): NormalizedProfile {
  const solved = new Set(submissions.filter(item => item.verdict === "OK").map(item => `${item.problem?.contestId}:${item.problem?.index}`));
  return { platformId:"codeforces", externalId:user.handle, displayName:user.handle, profileUrl:`https://codeforces.com/profile/${encodeURIComponent(user.handle)}`, platformData: { user, rating, submissions }, metrics:[
    {id:"rating",label:"Rating",value:user.rating ?? 0},{id:"max-rating",label:"Max rating",value:user.maxRating ?? 0},{id:"contests",label:"Rated contests",value:rating.length},{id:"solved",label:"Solved problems in fetched submissions",value:solved.size}
  ],series:[{id:"rating",label:"Rating history",points:rating.filter(item => typeof item.ratingUpdateTimeSeconds === "number" && typeof item.newRating === "number").map(item=>({timestamp:new Date(item.ratingUpdateTimeSeconds! * 1000).toISOString(),value:item.newRating!}))}] };
}
