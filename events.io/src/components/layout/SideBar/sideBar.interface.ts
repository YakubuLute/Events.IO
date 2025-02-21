import { ReactNode } from "react";

export interface MenuItem {
	groupLabel: string;
	groupIcon?: React.ReactNode;
	groupLink?: string;
	menuList: {
		url: string;
		icon: ReactNode;
		label: string;
		href?: string;
		count?: number;
	}[];
}