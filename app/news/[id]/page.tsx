import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { PcIcon, MobileIcon } from "@/components/icons";
import { Image } from "@nextui-org/image";

async function getNewsDetail(name: string) {
  // const res = await fetch(`https://daily.zeabur.app/${name}`);
  const res = await fetch(`daily-hot.zeabur.internal:8080/${name}`);
  if (!res.ok) return { news: null, error: new Error("Failed to fetch data api") };
  const response = await res?.json();
  if (response.code === 200) {
    return {
      news: response,
      error: null,
    };
  } else {
    return {
      news: null,
      error: new Error(response.message)
    };
  }
}

export default async function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const { news, error } = await getNewsDetail(params.id);
  return (
    <section>
      {news && (
        <div>
          <div className="text-center w-full mb-8">
            <Link href={news.link} target="_blank">
              <h1 className={title()}>{news.title}</h1>
            </Link>
            <h2 className={subtitle({ class: "mt-4" })}>
              {news.description} 
            </h2>
            <p className="mt-4 text-xs flex justify-center items-center">total: {news.total} <span className="mx-3" /> 更新时间: {news.updateTime}</p>
          </div>
          <div className="flex flex-wrap justify-center -m-4">
            {news.data &&
              news.data.map((item: any) => (
                <div className="w-full h-auto p-4 max-w-sm" key={item.id}>
                  <Card className="w-full h-full">
                    <CardHeader>
                      <p className="text-small text-default-500 text-right w-full">
                        From: {item.author}
                      </p>
                    </CardHeader>
                    <CardBody>
                      {item?.cover && (
                        <Link href={item.cover} target="_blank" className="flex justify-center items-center w-full">
                          <Image src={item.cover} srcSet={item.cover} alt={item.title} loading={'lazy'} isZoomed={true} shadow={'lg'} className="mb-2 max-h-80 overflow-hidden" />
                        </Link>
                      )}
                      <h4>{item.title}</h4>
                      {item?.desc && (
                        <>
                          <Divider className="my-2" />
                          <p className="text-xs text-ellipsis overflow-hidden max-h-16">{item.desc}</p>
                        </>
                      )}
                    </CardBody>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex h-5 items-center space-x-4 text-small">
                        <Link href={item.url} target="_blank">
                          <PcIcon />
                        </Link>
                        <Divider orientation="vertical" />
                        {item?.mobileUrl && (
                          <Link href={item.mobileUrl} target="_blank">
                            <MobileIcon />
                          </Link>
                        )}
                      </div>
                      <p className="text-small text-default-500">
                        Hot: {item.hot}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      )}
      {!news && !error && <h1 className={title()}>Loading...</h1>}
      {error && (
        <div className="flex w-full h-full flex-col justify-center items-center gap-4">
          <h1 className={title()}>Error: {error.message}</h1>
          <p className="text-center text-default-500">
            Please try again later.
          </p>
          <Link href="/">
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>
              Go back to home
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
