import { ReactNode } from "react";

type Props={
title:string;
description:string;
icon:ReactNode;
}

export default function QuickAction({
title,
description,
icon
}:Props){

return(

<button
className="
group
rounded-3xl
border
border-slate-200
bg-white
p-6
text-left
transition
hover:-translate-y-1
hover:border-[#5046E4]
hover:shadow-xl
"
>

<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEEDFC] text-[#5046E4]">
{icon}
</div>

<h3 className="font-semibold text-[#14123A]">
{title}
</h3>

<p className="mt-2 text-sm text-slate-500">
{description}
</p>

</button>

)

}
