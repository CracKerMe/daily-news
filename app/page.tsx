import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

type IRoutesList = {
	name: string;
	path: string;
};
async function getAllRoutes() {
	const res = await fetch("https://daily.zeabur.app/all");
	const routes = await res.json();
	if (routes.code === 200) {
		return routes.routes as IRoutesList[];
	} else {
		return []
	}
}

export default async function Home() {
	const allRoutes = await getAllRoutes();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>
			<div className="flex flex-wrap gap"></div>
			{allRoutes.length > 0 && (
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">新闻源列表：</h3>
					<ul className="flex flex-wrap gap-8">
						{allRoutes.map((route) => (
							<li key={route.path}>
								<Link href={`/news/${route.path}`} className="text-blue-500">
									{route.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
