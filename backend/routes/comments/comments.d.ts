export interface Comment {
	id: number;
	content: string;
	userId: number;
	pageId: string;
	parentId: number | null;
	replies: Comment[];
	createdAt: Date;
}
