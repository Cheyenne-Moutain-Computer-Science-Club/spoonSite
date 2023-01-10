import React from "react";
import Image from "next/image";

export default function ErrorModal(closeHandler, message) {
    const alignSide = (
        <div className="relative flex flex-auto flex-row p-6">
            <p className="my-4 text-lg leading-relaxed text-slate-500">
                {message}
            </p>
            <Image
                src="/statusIndicators/error.png"
                alt="Ope"
                width={128}
                height={128}
            />
        </div>
    );

    const alignVertical = (
        <div className="relative flex flex-auto flex-col p-6">
            <div className="mb-4 flex justify-center">
                <Image
                    src="/statusIndicators/warning.png"
                    alt="Ope"
                    width={128}
                    height={128}
                />
            </div>
            <hr />
            <p className="my-4 text-lg leading-relaxed text-slate-500">
                {message}
            </p>
        </div>
    );

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-auto max-w-2xl">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                            <h3 className="text-3xl font-semibold">Uh-oh...</h3>
                        </div>
                        {/*body*/}
                        <div>
                            <div className="hidden md:block">{alignSide}</div>
                            <div className="block md:hidden">
                                {alignVertical}
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                            <button
                                className="mr-1 mb-1 rounded bg-indigo-600 px-5 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                type="button"
                                onClick={closeHandler}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
}
