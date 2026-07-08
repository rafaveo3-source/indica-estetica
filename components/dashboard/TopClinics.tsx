const clinics = [
  ["Bella Face",95],
  ["Studio Prime",90],
  ["Royal Estética",84],
  ["Corpo & Arte",80],
];

export default function TopClinics(){

return(

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">

<h3 className="text-xl font-semibold">
Ranking das Clínicas
</h3>

<div className="mt-6 space-y-5">

{clinics.map(([name,score],index)=>(

<div
key={name}
className="flex items-center justify-between"
>

<div className="flex items-center gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEEDFC] font-semibold text-[#5046E4]">
#{index+1}
</div>

<span className="font-medium">
{name}
</span>

</div>

<span className="font-bold">
{score}%
</span>

</div>

))}

</div>

</div>

)

}
