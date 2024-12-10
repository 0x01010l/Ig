"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { blogs } from "@/data";
import { PinContainer } from "./Pin";
import { useRouter } from "next/navigation";

const Blogs = () => {
    const router = useRouter();
    return (
        <div className="py-20">
            <h1 className="heading" style={{ color: "white" }}>
                A collection of <span className="text-purple">recent Blogs</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-16 mt-20">
                {blogs.map((item) => (
                    <div
                        className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] mb-10"
                        key={item.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push(`/blogs/${item.id}`)}
                    >
                        <PinContainer
                            title="/ui.aceternity.com"
                            href="https://twitter.com/mannupaaji"
                        >
                            <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                                <div
                                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                                    style={{ backgroundColor: "#13162D" }}
                                >
                                    <img src="/bg.png" alt="bgimg" />
                                </div>
                                <img
                                    src={item.img}
                                    alt="cover"
                                    className="z-10 absolute bottom-0"
                                />
                            </div>

                            <h1
                                className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1"
                                style={{ color: "white" }}
                            >
                                {item.title}
                            </h1>

                            <p
                                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                                style={{
                                    color: "#BEC1DD",
                                    margin: "1vh 0",
                                }}
                            >
                                {item.des}
                            </p>
                        </PinContainer>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;