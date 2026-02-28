// 'use client';

// import React, { useEffect, useState } from 'react';

// import {
// Card,
// CardHeader,
// CardTitle,
// CardContent
// } from '@/components/ui/card';

// import {
// ResponsiveContainer,
// AreaChart,
// Area,
// BarChart,
// Bar,
// XAxis,
// YAxis,
// CartesianGrid,
// Tooltip,
// Legend,
// PieChart,
// Pie,
// Cell
// } from 'recharts';

// import {
// TrendingUp,
// Clock,
// Users,
// Home,
// DollarSign,
// Award,
// Phone
// } from 'lucide-react';

// import { Header } from '@/components/header';

// export default function AnalysisPage() {
// const [data, setData] = useState<any>(null);

// useEffect(() => {
// setData({
// durationData: [
// {duration: 50, successRate: 2},
// {duration: 100, successRate: 5},
// {duration: 150, successRate: 8},
// {duration: 200, successRate: 12},
// {duration: 250, successRate: 18},
// {duration: 300, successRate: 25},
// {duration: 350, successRate: 32},
// {duration: 400, successRate: 40},
// {duration: 450, successRate: 48},
// {duration: 500, successRate: 55},
// {duration: 550, successRate: 62},
// {duration: 600, successRate: 68},
// {duration: 650, successRate: 73},
// {duration: 700, successRate: 78},
// {duration: 750, successRate: 82},
// {duration: 800, successRate: 85}
// ],
// ageGroups: [
// {ageGroup: 'Under 25', yes: 850, no: 1200},
// {ageGroup: '25-30', yes: 1100, no: 2800},
// {ageGroup: '30-40', yes: 1300, no: 4200},
// {ageGroup: '40-50', yes: 980, no: 3800},
// {ageGroup: '50-60', yes: 620, no: 2200},
// {ageGroup: 'Over 60', yes: 439, no: 721}
// ],
// loanData: [
// {loanType: 'No Housing Loan', yes: 3200, no: 1500},
// {loanType: 'Has Housing Loan', yes: 2089, no: 8422}
// ],
// previousOutcome: [
// {outcome: 'Success', value: 68, percentage: 68},
// {outcome: 'Unknown', value: 20, percentage: 20},
// {outcome: 'Failure', value: 12, percentage: 12}
// ],
// summaryTable: [
// {factor: 'Duration Impact', yesValue: 'duration > 500 sec', noValue: 'less than 180 sec', icon: Clock},
// {factor: 'Debt Analysis', yesValue: 'Housing No (0)', noValue: 'Housing Yes (1)', icon: Home},
// {factor: 'Experience', yesValue: 'Success', noValue: 'Unknown/Failure', icon: Award},
// {factor: 'Life Stage', yesValue: 'age under 25 or over 60', noValue: '30 to 50', icon: Users},
// {factor: 'Contact Frequency', yesValue: '1 - 3 times', noValue: 'over 6 times', icon: Phone}
// ]
// });
// }, []);

// if (!data) return null;

// const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'];

// return (
// <div className="min-h-screen">
// <div className="p-10 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:text-white space-y-10">

// <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-4">
// Advanced Bank Marketing Analysis
// </h1>
// <p className="text-center text-xl dark:text-gray-300 text-gray-700 mb-12 max-w-4xl mx-auto">
// Comprehensive insights into customer behavior patterns and subscription drivers using advanced data visualization
// </p>

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700 mb-10">
// <CardHeader>
// <CardTitle className="flex gap-2 text-2xl">
// <TrendingUp/> Key Insights Summary
// </CardTitle>
// </CardHeader>
// <CardContent>
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
// {data.summaryTable.map((item: any, index: number) => (
// <div key={index} className="p-4 dark:bg-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-600">
// <div className="flex items-center mb-2">
// <item.icon className="h-5 w-5 mr-2 text-blue-500"/>
// <span className="font-semibold dark:text-white text-gray-900">{item.factor}</span>
// </div>
// <div className="space-y-1">
// <div className="flex items-center">
// <span className="text-green-600 font-medium">Yes:</span>
// <span className="ml-2 dark:text-gray-300 text-gray-700 text-sm">{item.yesValue}</span>
// </div>
// <div className="flex items-center">
// <span className="text-red-600 font-medium">No:</span>
// <span className="ml-2 dark:text-gray-300 text-gray-700 text-sm">{item.noValue}</span>
// </div>
// </div>
// </div>
// ))}
// </div>
// </CardContent>
// </Card>

// <div className="grid md:grid-cols-2 gap-8">

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700">
// <CardHeader>
// <CardTitle className="flex gap-2">
// <Clock/> Call Duration vs Success Rate
// </CardTitle>
// </CardHeader>
// <CardContent>
// <div className="mb-4">
// <div className="flex items-center justify-between p-3 dark:bg-gray-700 bg-gray-50 rounded-lg">
// <span className="text-sm font-medium dark:text-gray-300 text-gray-700">Turning Point:</span>
// <span className="text-sm font-bold text-blue-500">500 seconds</span>
// </div>
// </div>
// <ResponsiveContainer width="100%" height={300}>
// <AreaChart data={data.durationData}>
// <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
// <XAxis dataKey="duration" />
// <YAxis />
// <Tooltip />
// <Area type="monotone" dataKey="successRate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6}/>
// </AreaChart>
// </ResponsiveContainer>
// <div className="mt-4 grid grid-cols-2 gap-4">
// <div className="p-3 dark:bg-green-900 bg-green-50 rounded-lg">
// <div className="text-green-600 font-semibold">0-200s Range</div>
// <div className="text-sm dark:text-gray-300 text-gray-700">~0% Success Rate</div>
// </div>
// <div className="p-3 dark:bg-blue-900 bg-blue-50 rounded-lg">
// <div className="text-blue-600 font-semibold">over 500s Range</div>
// <div className="text-sm dark:text-gray-300 text-gray-700">over 50% Success Rate</div>
// </div>
// </div>
// </CardContent>
// </Card>

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700">
// <CardHeader>
// <CardTitle className="flex gap-2">
// <Users/> Age Groups: Yes vs No Distribution
// </CardTitle>
// </CardHeader>
// <CardContent>
// <ResponsiveContainer width="100%" height={350}>
// <BarChart data={data.ageGroups}>
// <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
// <XAxis dataKey="ageGroup" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Bar dataKey="yes" fill="#22c55e" name="Yes (Subscribed)"/>
// <Bar dataKey="no" fill="#ef4444" name="No (Not Subscribed)"/>
// </BarChart>
// </ResponsiveContainer>
// <div className="mt-4 p-3 dark:bg-gray-700 bg-gray-50 rounded-lg">
// <div className="text-sm dark:text-gray-300 text-gray-700">
// <span className="font-semibold">Key Insight:</span> 30-50 years show highest "No" volume, while under 25 and over 60 years show highest "Yes" ratio
// </div>
// </div>
// </CardContent>
// </Card>

// </div>

// <div className="grid md:grid-cols-2 gap-8">

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700">
// <CardHeader>
// <CardTitle className="flex gap-2">
// <Home/> Financial Burden: Housing Loan Impact
// </CardTitle>
// </CardHeader>
// <CardContent>
// <ResponsiveContainer width="100%" height={300}>
// <BarChart data={data.loanData}>
// <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
// <XAxis dataKey="loanType" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Bar dataKey="yes" fill="#22c55e" name="Yes (Subscribed)"/>
// <Bar dataKey="no" fill="#ef4444" name="No (Not Subscribed)"/>
// </BarChart>
// </ResponsiveContainer>
// <div className="mt-4 grid grid-cols-2 gap-4">
// <div className="p-3 dark:bg-green-900 bg-green-50 rounded-lg">
// <div className="text-green-600 font-semibold">No Housing Loan</div>
// <div className="text-sm dark:text-gray-300 text-gray-700">Large green segment</div>
// </div>
// <div className="p-3 dark:bg-red-900 bg-red-50 rounded-lg">
// <div className="text-red-600 font-semibold">Has Housing Loan</div>
// <div className="text-sm dark:text-gray-300 text-gray-700">Large red segment</div>
// </div>
// </div>
// </CardContent>
// </Card>

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700">
// <CardHeader>
// <CardTitle className="flex gap-2">
// <DollarSign/> Account Balance: Wealth Factor
// </CardTitle>
// </CardHeader>
// <CardContent>
// <ResponsiveContainer width="100%" height={300}>
// <BarChart data={[
// {target: 'Yes', median: 2400, name: 'Median Balance'},
// {target: 'No', median: 800, name: 'Median Balance'}
// ]}>
// <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
// <XAxis dataKey="target" />
// <YAxis />
// <Tooltip />
// <Legend />
// <Bar dataKey="median" fill="#10b981" name="Median Balance"/>
// </BarChart>
// </ResponsiveContainer>
// <div className="mt-4 p-3 dark:bg-gray-700 bg-gray-50 rounded-lg">
// <div className="text-sm dark:text-gray-300 text-gray-700">
// <span className="font-semibold">Key Insight:</span> High median balance linked to "Yes", negative/zero balance concentrated in "No"
// </div>
// </div>
// </CardContent>
// </Card>

// </div>

// <Card className="dark:bg-slate-800 bg-white shadow-xl border border-gray-200 dark:border-gray-700">
// <CardHeader>
// <CardTitle className="flex gap-2">
// <Award/> Previous Success Analysis
// </CardTitle>
// </CardHeader>
// <CardContent>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// <div>
// <ResponsiveContainer width="100%" height={300}>
// <PieChart>
// <Pie
// data={data.previousOutcome}
// cx="50%"
// cy="50%"
// innerRadius={60}
// outerRadius={100}
// paddingAngle={5}
// dataKey="value"
// >
// {data.previousOutcome.map((entry: any, index: number) => (
// <Cell key={index} fill={COLORS[index]}/>
// ))}
// </Pie>
// <Tooltip />
// <Legend />
// </PieChart>
// </ResponsiveContainer>
// </div>
// <div className="space-y-4">
// {data.previousOutcome.map((item: any, index: number) => (
// <div key={index} className="p-4 dark:bg-gray-700 bg-gray-50 rounded-lg border-l-4 border-blue-500">
// <div className="font-semibold dark:text-white text-gray-900">{item.outcome}</div>
// <div className="text-2xl font-bold text-blue-500">{item.percentage}%</div>
// <div className="text-sm dark:text-gray-400 text-gray-600">
// {item.outcome === 'Success' ? '60-70% of these people say Yes again' : 
// item.outcome === 'Unknown' ? 'Majority result in No' : 'Majority result in No'}
// </div>
// </div>
// ))}
// </div>
// </div>
// </CardContent>
// </Card>

// </div>
// </div>
// );
// }


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