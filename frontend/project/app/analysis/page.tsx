'use client';

import React, { useEffect, useState } from 'react';

import {
Card,
CardHeader,
CardTitle,
CardContent
} from '@/components/ui/card';

import {
ResponsiveContainer,
AreaChart,
Area,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
PieChart,
Pie,
Cell
} from 'recharts';

import {
TrendingUp,
Clock,
Users,
Home,
DollarSign,
Award,
Phone
} from 'lucide-react';

export default function AnalysisPage() {

const [data, setData] = useState<any>(null);

useEffect(() => {

setData({

durationData: [
{duration: 50, successRate: 2},
{duration: 100, successRate: 5},
{duration: 150, successRate: 8},
{duration: 200, successRate: 12},
{duration: 250, successRate: 18},
{duration: 300, successRate: 25},
{duration: 350, successRate: 32},
{duration: 400, successRate: 40},
{duration: 450, successRate: 48},
{duration: 500, successRate: 55},
{duration: 550, successRate: 62},
{duration: 600, successRate: 68},
{duration: 650, successRate: 73},
{duration: 700, successRate: 78},
{duration: 750, successRate: 82},
{duration: 800, successRate: 85}
],

ageGroups: [
{ageGroup: 'Under 25', yes: 850, no: 1200},
{ageGroup: '25-30', yes: 1100, no: 2800},
{ageGroup: '30-40', yes: 1300, no: 4200},
{ageGroup: '40-50', yes: 980, no: 3800},
{ageGroup: '50-60', yes: 620, no: 2200},
{ageGroup: 'Over 60', yes: 439, no: 721}
],

loanData: [
{loanType: 'No Housing Loan', yes: 3200, no: 1500},
{loanType: 'Has Housing Loan', yes: 2089, no: 8422}
],

previousOutcome: [
{outcome: 'Success', value: 68},
{outcome: 'Unknown', value: 20},
{outcome: 'Failure', value: 12}
],

stats: [

{
title: "Success Rate",
value: "68%",
icon: TrendingUp,
color: "text-green-500"
},

{
title: "Best Duration",
value: "500+ sec",
icon: Clock,
color: "text-blue-500"
},

{
title: "Best Age Group",
value: "25-40",
icon: Users,
color: "text-purple-500"
},

{
title: "No Housing Loan",
value: "High Success",
icon: Home,
color: "text-orange-500"
}

]

});

}, []);

if (!data) return null;

const COLORS = ['#22c55e','#ef4444','#3b82f6'];

return (

<div className="min-h-screen dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#020617] dark:to-black bg-gradient-to-br from-gray-50 to-gray-100 p-10 space-y-10">


{/* HERO */}

<div className="text-center space-y-4">

<h1 className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">

Subscription Prediction Analysis

</h1>

<p className="dark:text-slate-400 text-gray-600 text-xl">

Advanced Customer Subscription Analytics & Insights

</p>

</div>



{/* STATS */}

<div className="grid md:grid-cols-4 gap-8">

{data.stats.map((item:any,index:number)=>{

const Icon=item.icon;

return(

<Card key={index}
className="
dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl dark:border dark:border-white/10 border border-gray-200 hover:border-cyan-400/40 hover:shadow-cyan-500/20 shadow-xl transition-all duration-300 hover:scale-105
"
>

<CardContent className="p-6 flex justify-between items-center">


<div>

<p className="dark:text-slate-400 text-gray-600 text-sm">

{item.title}

</p>

<h2 className="dark:text-white text-gray-900 text-3xl font-bold mt-1">

{item.value}

</h2>

</div>


<div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">

<Icon className="h-6 w-6 text-white"/>

</div>


</CardContent>

</Card>

);

})}

</div>



{/* CHART SECTION */}

<div className="grid md:grid-cols-2 gap-10">


{/* Duration */}

<Card className="dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#0f172a] bg-white border border-gray-200 dark:border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/20 transition">

<CardHeader>

<CardTitle className="dark:text-cyan-400 text-gray-900 text-xl font-semibold">

Call Duration Success Trend

</CardTitle>

</CardHeader>

<CardContent>

<ResponsiveContainer width="100%" height={320}>

<AreaChart data={data.durationData}>

<CartesianGrid stroke="#1e293b"/>

<XAxis stroke="#94a3b8" dataKey="duration"/>

<YAxis stroke="#94a3b8"/>

<Tooltip

contentStyle={{

background:"#020617",

border:"1px solid cyan",

borderRadius:"10px"

}}

/>

<Area

type="monotone"

dataKey="successRate"

stroke="#06b6d4"

fill="url(#colorGradient)"

/>

<defs>

<linearGradient id="colorGradient">

<stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8}/>

<stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>

</linearGradient>

</defs>

</AreaChart>

</ResponsiveContainer>

</CardContent>

</Card>



{/* Age */}

<Card className="dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#0f172a] bg-white border border-gray-200 dark:border-emerald-500/20 shadow-2xl hover:shadow-emerald-500/20 transition">

<CardHeader>

<CardTitle className="dark:text-emerald-400 text-gray-900 text-xl">

Age Group Analysis

</CardTitle>

</CardHeader>

<CardContent>

<ResponsiveContainer width="100%" height={320}>

<BarChart data={data.ageGroups}>

<CartesianGrid stroke="#1e293b"/>

<XAxis stroke="#94a3b8" dataKey="ageGroup"/>

<YAxis stroke="#94a3b8"/>

<Tooltip contentStyle={{background:"#020617"}}/>

<Legend/>

<Bar dataKey="yes" fill="#10b981" radius={[5,5,0,0]}/>

<Bar dataKey="no" fill="#ef4444" radius={[5,5,0,0]}/>

</BarChart>

</ResponsiveContainer>

</CardContent>

</Card>



{/* Loan */}

<Card className="dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#0f172a] bg-white border border-gray-200 dark:border-purple-500/20 shadow-2xl hover:shadow-purple-500/20 transition">

<CardHeader>

<CardTitle className="dark:text-purple-400 text-gray-900 text-xl">

Housing Loan Impact

</CardTitle>

</CardHeader>

<CardContent>

<ResponsiveContainer width="100%" height={320}>

<BarChart data={data.loanData}>

<CartesianGrid stroke="#1e293b"/>

<XAxis stroke="#94a3b8" dataKey="loanType"/>

<YAxis stroke="#94a3b8"/>

<Tooltip contentStyle={{background:"#020617"}}/>

<Legend/>

<Bar dataKey="yes" fill="#8b5cf6" radius={[5,5,0,0]}/>

<Bar dataKey="no" fill="#f43f5e" radius={[5,5,0,0]}/>

</BarChart>

</ResponsiveContainer>

</CardContent>

</Card>



{/* Pie */}

<Card className="dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#0f172a] bg-white border border-gray-200 dark:border-yellow-500/20 shadow-2xl hover:shadow-yellow-500/20 transition">

<CardHeader>

<CardTitle className="dark:text-yellow-400 text-gray-900 text-xl">

Previous Campaign Result

</CardTitle>

</CardHeader>

<CardContent>

<ResponsiveContainer width="100%" height={320}>

<PieChart>

<Pie
data={data.previousOutcome}
innerRadius={60}
outerRadius={100}
paddingAngle={5}
dataKey="value"
nameKey="outcome"
>
<Cell fill="#22c55e"/>
<Cell fill="#eab308"/>
<Cell fill="#ef4444"/>
</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</CardContent>

</Card>


</div>

</div>

);
}