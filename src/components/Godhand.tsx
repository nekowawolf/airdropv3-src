'use client';

import Image from "next/image";
import Link from "next/link";

export default function GodhandSection() {
    return (
        <section className="flex items-center justify-center relative">
            <Image
                src="/images/godhand.png"
                alt="Explore Airdrop"
                width={1600}
                height={1600}
                className="object-cover"
                priority
            />

            <Link href="/airdrops" className="absolute flex flex-col items-center sm:mr-14 mr-7">
                <Image
                    src="/images/folder.png"
                    alt="Folder"
                    width={96}
                    height={96}
                    className="w-14 sm:w-24 h-14 sm:h-24 cursor-pointer"
                />
                <p className="-mt-2 text-fill-color text-[10px] sm:text-xl font-semibold drop-shadow-md">
                    Explore Airdrop
                </p>
            </Link>
        </section>
    );
}