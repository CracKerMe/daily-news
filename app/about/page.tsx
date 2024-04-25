import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div className="gap-6 flex flex-col">
			<h1 className={title()}>摸鱼资讯</h1>
			<p>
				这是一个使用 Next.js 构建的摸鱼资讯网站，用于展示各种新闻源的新闻。
			</p>

			<h2 className={subtitle()}>关于作者</h2>
			<p>
				作者是一个前端工程师，喜欢摸鱼，喜欢写代码。
			</p>

			<h2 className={subtitle()}>数据接口来源</h2>

			<p>
				数据接口来自于 <a href="https://github.com/imsyy/DailyHotApi" target="_blank" className="border-blue-500 text-blue-500 border-b-1 px-4 py-2">https://github.com/imsyy/DailyHotApi</a>，感谢作者提供的数据接口。
			</p>
		</div>
	);
}
