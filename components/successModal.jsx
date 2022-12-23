import React from "react";

export default function SuccessModal(name, numberTagged) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-auto max-w-sm">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                            <h3 className="text-3xl font-semibold">Bravo!</h3>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto p-6">
                            <div className="flex justify-center">
                                <img className="w-56" src="tick2.gif" />
                            </div>
                            <p className=" mb-2 text-lg leading-relaxed text-slate-500">
                                You have successfully tagged&nbsp;
                                <span className="font-bold">{name}!</span>
                                <br className="my-3" />
                                Number of people tagged:&nbsp;
                                <span className="font-bold">
                                    {numberTagged}
                                </span>
                                &nbsp;
                                {numberTagged == 1 ? "person" : "people"}.
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                            <button
                                className="mr-1 mb-1 rounded bg-indigo-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
}
