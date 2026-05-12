interface SkillRecord {
    id:string;
    title:string;
    slug:string;
    description:string;
    category:string;
    tags:string[];
    installCommand:string;
    createdAt:string |null;
    authorClerkId:string|null;
    authorEmail:string|null;
}