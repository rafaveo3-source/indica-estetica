"use client";

type Option={
label:string;
value:string;
};

type Props={
options:Option[];
value:string;
onChange(value:string):void;
};

export function FilterDropdown({
options,
value,
onChange,
}:Props){

return(

<select
value={value}
onChange={(e)=>onChange(e.target.value)}
className="h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none"
>

{options.map(option=>(

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

))}

</select>

);

}
