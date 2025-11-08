import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { StarIcon } from './icons/StarIcon';
import { DocumentArrowDownIcon } from './icons/DocumentArrowDownIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { ArrowTrendingDownIcon } from './icons/ArrowTrendingDownIcon';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { DataIcon } from './icons/DataIcon';
import { DataRolloverIcon } from './icons/DataRolloverIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { UsersIcon } from './icons/UsersIcon';

// Add declarations for CDN libraries
declare const jspdf: any;
declare const html2canvas: any;


const ottServices = [
  { key: 'netflix', name: 'Netflix Basic' },
  { key: 'prime', name: 'Amazon Prime Video' },
  { key: 'hotstar', name: 'Disney+ Hotstar' },
  { key: 'sony', name: 'Sony LIV' },
  { key: 'swiggy', name: 'Swiggy One' },
  { key: 'eazydiner', name: 'EazyDiner Prime' },
  { key: 'norton', name: 'Norton Anti-virus' },
];

const planData = {
    '701': {
        name: "Vi Max Family 701",
        price: 701,
        includedLines: 2,
        dataPrimary: "70GB",
        dataSharing: "10GB",
        telcoBenefits: [
            "Unlimited Calls (Local, STD, National roaming)", "70GB Data for Primary Member", "40GB Data for Secondary Members", "200GB Data Rollover", "10GB Extra Data for Sharing", "3000 SMS (Local, STD, National roaming)", "Single Bill for all family members"
        ],
        exclusiveBenefits: ["None (VI Max Family 701 has no exclusive benefits)"],
        exclusiveOtts: ['vi-movies'],
        flexibleOttCount: 2,
        flexibleOttChoices: ['prime', 'hotstar', 'sony', 'swiggy', 'eazydiner', 'norton'],
        optionalOttChoices: ["Amazon Prime - 6 months", "Sony LIV - 1 year", "JioHotstar - 1 year", "Swiggy One - 6 months", "EazyDiner Prime - 6 months", "Norton Anti-virus - 1 year"]
    },
    '871': {
        name: "Vi Max Family 871",
        price: 871,
        includedLines: 2,
        dataPrimary: "70GB",
        dataSharing: "10GB",
        telcoBenefits: [
            "Unlimited Calls (Local, STD, National roaming)", "70GB Data for Primary Member", "40GB Data for Secondary Members", "200GB Data Rollover", "10GB Extra Data for Sharing", "3000 SMS (Local, STD, National roaming)", "Single Bill for all family members"
        ],
        exclusiveBenefits: ["Netflix Basic (included at no extra cost)", "Vi Priority"],
        exclusiveOtts: ['vi-movies', 'netflix'],
        flexibleOttCount: 2,
        flexibleOttChoices: ['prime', 'hotstar', 'sony', 'swiggy', 'eazydiner', 'norton'],
        optionalOttChoices: ["Amazon Prime - 6 months", "Sony LIV - 1 year", "JioHotstar - 1 year", "Swiggy One - 6 months", "EazyDiner Prime - 6 months", "Norton Anti-virus - 1 year"]

    },
    '1201': {
        name: "Vi Max Family 1201",
        price: 1201,
        includedLines: 4,
        dataPrimary: "140GB",
        dataSharing: "20GB",
        telcoBenefits: [
            "Unlimited Calls (Local, STD, National roaming)", "140GB Data for Primary Member", "40GB Data for Secondary Members", "200GB Data Rollover", "20GB Extra Data for Sharing", "3000 SMS (Local, STD, National roaming)", "Single Bill for all family members"
        ],
        exclusiveBenefits: ["Vi Priority"],
        exclusiveOtts: ['vi-movies'],
        flexibleOttCount: 2,
        flexibleOttChoices: ['prime', 'hotstar', 'sony', 'swiggy', 'eazydiner', 'norton'],
        optionalOttChoices: ["Amazon Prime - 6 months", "Sony LIV - 1 year", "JioHotstar - 1 year", "Swiggy One - 6 months", "EazyDiner Prime - 6 months", "Norton Anti-virus - 1 year"]
    },
    '1401': {
        name: "Vi Max Family 1401",
        price: 1401,
        includedLines: 5,
        dataPrimary: "140GB",
        dataSharing: "25GB",
        telcoBenefits: [
             "Unlimited Calls (Local, STD, National roaming)", "140GB Data for Primary Member", "40GB Data for Secondary Members", "200GB Data Rollover", "25GB Extra Data for Sharing", "3000 SMS (Local, STD, National roaming)", "Single Bill for all family members"
        ],
        exclusiveBenefits: ["Vi Priority"],
        exclusiveOtts: ['vi-movies'],
        flexibleOttCount: 2,
        flexibleOttChoices: ['prime', 'hotstar', 'sony', 'swiggy', 'eazydiner', 'norton'],
        optionalOttChoices: ["Amazon Prime - 6 months", "Sony LIV - 1 year", "JioHotstar - 1 year", "Swiggy One - 6 months", "EazyDiner Prime - 6 months", "Norton Anti-virus - 1 year"]
    },
};

type OttSelection = {
    [key: string]: { selected: boolean; cost: number };
}

interface Result {
    planKey: string;
    planDetails: any;
    addOns: number;
    newPlanCost: number;
    monthlySavings: number;
    annualSavings: number;
    matchedOtts: { key: string; name: string; cost: number }[];
    unmatchedOtts: { key: string; name: string; cost: number }[];
}

const SavingsCalculator: React.FC = () => {
    const [step, setStep] = useState(1);
    const [lines, setLines] = useState<string>('');
    const [lineSpends, setLineSpends] = useState<number[]>([]);
    // FIX: The initial value for reduce was an untyped `{}`, causing TypeScript to infer the state as an empty object.
    // This has been corrected by explicitly providing the `OttSelection` type to both `useState` and the `reduce` accumulator,
    // which resolves property access errors throughout the component.
    const [selectedOtts, setSelectedOtts] = useState<OttSelection>(
        ottServices.reduce<OttSelection>((acc, ott) => ({ ...acc, [ott.key]: { selected: false, cost: 0 } }), {})
    );
    const [results, setResults] = useState<Result[] | null>(null);
    const [error, setError] = useState<string>('');

    const handleLinesSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const numLines = parseInt(lines, 10);
        if (isNaN(numLines) || numLines < 1 || numLines > 10) {
            setError('Please enter a valid number of lines (1-10).');
            return;
        }
        setLineSpends(Array(numLines).fill(0));
        setStep(2);
    };

    const handleSpendingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (lineSpends.some(spend => spend < 0)) {
            setError('Please enter valid, non-negative spending amounts.');
            return;
        }
        if (lineSpends.reduce((a, b) => a + b, 0) <= 0) {
            setError('Please enter a spending amount for at least one line.');
            return;
        }
        setStep(3);
    }
    
    const handleOttChange = (key: string, field: 'selected' | 'cost', value: boolean | number) => {
        setSelectedOtts(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const calculateResults = () => {
        const numLines = parseInt(lines, 10);
        const currentLineSpending = lineSpends.reduce((a, b) => a + b, 0);
        const userOtts = Object.entries(selectedOtts)
            .filter(([, val]) => val.selected && val.cost > 0)
            .map(([key, val]) => ({ key, cost: val.cost, name: ottServices.find(o => o.key === key)?.name || key }));

        const currentOttSpending = userOtts.reduce((acc, ott) => acc + ott.cost, 0);
        const totalCurrentSpending = currentLineSpending + currentOttSpending;
        
        let planScenarios: {planKey: keyof typeof planData, addOns: number}[] = [];
        
        if (numLines >= 2) {
             if (numLines <= 3) {
                planScenarios.push({ planKey: '701', addOns: Math.max(0, numLines - 2) });
                if (selectedOtts.netflix.selected) {
                    planScenarios.push({ planKey: '871', addOns: Math.max(0, numLines - 2) });
                }
            } else if (numLines === 4) {
                 const plan701Cost = planData['701'].price + 2 * 299;
                 const plan1201Cost = planData['1201'].price;
                 planScenarios.push({ planKey: '1201', addOns: 0 });
                 if(selectedOtts.netflix.selected) {
                    const plan871Cost = planData['871'].price + 2*299;
                    if (plan871Cost < plan1201Cost) {
                         planScenarios.push({ planKey: '871', addOns: 2 });
                    }
                 }
            } else if (numLines === 5) {
                planScenarios.push({ planKey: '1401', addOns: 0 });
            } else if (numLines <= 9) {
                planScenarios.push({ planKey: '1401', addOns: numLines - 5 });
            }
        }

        const calculatedResults: Result[] = planScenarios.map(scenario => {
            const planDetails = planData[scenario.planKey];
            const newPlanCost = planDetails.price + (scenario.addOns * 299);
            
            const matchedOtts: { key: string; name: string; cost: number }[] = [];
            const unmatchedOtts = [...userOtts];
            
            planDetails.exclusiveOtts.forEach(ottKey => {
                const userOttIndex = unmatchedOtts.findIndex(o => o.key === ottKey);
                if (userOttIndex > -1) {
                    matchedOtts.push(unmatchedOtts[userOttIndex]);
                    unmatchedOtts.splice(userOttIndex, 1);
                }
            });
            
            const potentialFlexible = unmatchedOtts
                .filter(ott => planDetails.flexibleOttChoices.includes(ott.key))
                .sort((a, b) => b.cost - a.cost);
            
            const flexibleToTake = potentialFlexible.slice(0, planDetails.flexibleOttCount);
            flexibleToTake.forEach(ottToMatch => {
                 const userOttIndex = unmatchedOtts.findIndex(o => o.key === ottToMatch.key);
                 if (userOttIndex > -1) {
                    matchedOtts.push(unmatchedOtts[userOttIndex]);
                    unmatchedOtts.splice(userOttIndex, 1);
                 }
            });
            
            const monthlySavings = totalCurrentSpending - newPlanCost;

            return {
                planKey: scenario.planKey,
                planDetails,
                addOns: scenario.addOns,
                newPlanCost,
                monthlySavings: Math.round(monthlySavings),
                annualSavings: Math.round(monthlySavings * 12),
                matchedOtts,
                unmatchedOtts
            };
        });

        const finalResults = calculatedResults.filter(r => r.monthlySavings > 0);
        finalResults.sort((a, b) => b.monthlySavings - a.monthlySavings);
        setResults(finalResults);
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const ottCosts = Object.values(selectedOtts).map(v => v.cost);
        if (ottCosts.some(cost => cost < 0 || cost > 5000)) {
            setError('Please enter valid OTT costs (₹0-₹5,000).');
            return;
        }
        
        calculateResults();
        setStep(4);
    };
    
    const handleDownloadPdf = () => {
        const reportElement = document.getElementById('savings-report');
        if (reportElement && typeof html2canvas !== 'undefined' && typeof jspdf !== 'undefined') {
            const downloadButton = document.getElementById('download-pdf-button');
            if (downloadButton) downloadButton.style.display = 'none';

            html2canvas(reportElement, {
                scale: 2,
                useCORS: true, 
            }).then(canvas => {
                if (downloadButton) downloadButton.style.display = 'inline-flex';

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('vi-plan-savings-report.pdf');
            }).catch(err => {
                 if (downloadButton) downloadButton.style.display = 'inline-flex';
                 console.error("Error generating PDF:", err);
                 setError("Sorry, we couldn't generate the PDF. Please try again.");
            });
        } else {
             setError("PDF generation feature is not available right now. Please try again later.");
        }
    };


    const handleReset = () => {
        setStep(1);
        setLines('');
        setLineSpends([]);
        // FIX: Similarly, when resetting state, the new object must be correctly typed to avoid reintroducing type errors.
        setSelectedOtts(ottServices.reduce<OttSelection>((acc, ott) => ({ ...acc, [ott.key]: { selected: false, cost: 0 } }), {}));
        setResults(null);
        setError('');
    };
    
    const CurrentSpendingBreakdown: React.FC = () => {
        const currentLineSpending = lineSpends.reduce((a, b) => a + b, 0);
        const userOtts = Object.entries(selectedOtts)
            .filter(([, val]) => val.selected && val.cost > 0)
            .map(([key, val]) => ({ key, cost: val.cost, name: ottServices.find(o => o.key === key)?.name || key }));
        const currentOttSpending = userOtts.reduce((acc, ott) => acc + ott.cost, 0);
        const totalCurrentSpending = currentLineSpending + currentOttSpending;

        return (
             <div className="border border-gray-200 bg-gray-50 rounded-xl p-4 sm:p-6 mb-8 text-left text-sm">
                <h3 className="font-bold text-gray-800 text-base mb-4">📊 Your Current Monthly Spending</h3>
                <div className="space-y-3">
                    <dl className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <dt className="font-semibold text-gray-600">Mobile Lines Subtotal:</dt>
                            <dd className="font-bold text-gray-800">₹{currentLineSpending}</dd>
                        </div>
                        {userOtts.length > 0 && (
                            <div className="flex justify-between items-baseline">
                                <dt className="font-semibold text-gray-600">OTT Subscriptions Subtotal:</dt>
                                <dd className="font-bold text-gray-800">₹{currentOttSpending}</dd>
                            </div>
                        )}
                    </dl>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                     <dl className="space-y-2">
                        <div className="flex justify-between items-baseline text-base">
                            <dt className="font-extrabold text-gray-900">Total Monthly Spending:</dt>
                            <dd className="font-extrabold text-gray-900">₹{totalCurrentSpending}</dd>
                        </div>
                         <div className="flex justify-between items-baseline text-xs text-gray-500">
                            <dt>Equivalent Annual Spending:</dt>
                            <dd>₹{totalCurrentSpending * 12}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        );
    };

    const PlanResultBreakdown: React.FC<{ result: Result, isBest: boolean }> = ({ result, isBest }) => {
         const ottSavings = result.matchedOtts.reduce((acc, ott) => acc + ott.cost, 0);
         const lineCostChange = result.newPlanCost - lineSpends.reduce((a,b)=>a+b, 0);

         return (
            <div className={`relative border-2 rounded-2xl p-4 sm:p-6 text-left transition-all h-full flex flex-col ${isBest ? 'bg-white border-[#e60000] shadow-2xl' : 'bg-gray-50/50 border-gray-200'}`}>
                {isBest && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e60000] text-white font-bold text-sm px-4 py-1 rounded-full flex items-center gap-1 shadow-lg"><StarIcon className="h-4 w-4"/> BETTER SAVINGS</div>}
                
                <h3 className="font-extrabold text-lg text-gray-900 mb-4 text-center sm:text-left">
                    <span className="text-green-600">✔</span> Option: {result.planDetails.name}{result.addOns > 0 ? ` + ${result.addOns} Add-on` : ''}
                </h3>

                <div className="space-y-6 flex-grow">
                    
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <p className="font-bold text-sm text-gray-600">New Plan Cost</p>
                        <p className="font-extrabold text-2xl text-gray-900">₹{result.newPlanCost}<span className="text-base font-medium">/month</span></p>
                    </div>

                    <div>
                        <p className="font-bold mb-2">Key Benefits Included:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                             <div className="flex items-center gap-2"><PhoneIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">Unlimited Calls</span></div>
                             <div className="flex items-center gap-2"><DataIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">{result.planDetails.dataPrimary} Primary Data</span></div>
                             <div className="flex items-center gap-2"><DataRolloverIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">200GB Rollover</span></div>
                             <div className="flex items-center gap-2"><ChatBubbleLeftRightIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">3000 SMS</span></div>
                             <div className="flex items-center gap-2"><UsersIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">{result.planDetails.includedLines + result.addOns} Lines</span></div>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-bold mb-1">OTT Breakdown:</p>
                        <ul className="space-y-1 text-sm">
                            {result.matchedOtts.map(ott => (
                                <li key={ott.key} className="flex items-center"><CheckIcon className="h-4 w-4 text-green-600 mr-2"/> <span className="font-semibold">{ott.name}</span>&nbsp;is included <span className="text-green-600 ml-auto font-bold">(Saves ₹{ott.cost})</span></li>
                            ))}
                            {result.unmatchedOtts.map(ott => (
                                <li key={ott.key} className="flex items-center"><XCircleIcon className="h-4 w-4 text-red-500 mr-2"/> <span className="font-semibold">{ott.name}</span>&nbsp;is NOT included <span className="text-red-500 ml-auto font-bold">(Cost ₹{ott.cost})</span></li>
                            ))}
                        </ul>
                    </div>

                    <div className="!mt-auto pt-4 border-t border-dashed">
                         <p className="font-bold mb-1">Savings Calculation:</p>
                         <ul className="space-y-1 text-sm">
                             <li className={`flex items-center ${lineCostChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {lineCostChange > 0 ? <ArrowTrendingUpIcon className="h-4 w-4 mr-2"/> : <ArrowTrendingDownIcon className="h-4 w-4 mr-2"/>}
                                Line cost change:
                                <span className="ml-auto font-bold">{lineCostChange > 0 ? `+₹${lineCostChange}` : `-₹${-lineCostChange}`}</span>
                             </li>
                              <li className="flex items-center text-green-600">
                                <ArrowTrendingDownIcon className="h-4 w-4 mr-2"/>
                                OTT cost savings:
                                <span className="ml-auto font-bold">-₹{ottSavings}</span>
                             </li>
                         </ul>
                         
                         <div className="mt-4 text-center bg-green-50 border border-green-200 p-3 rounded-lg">
                            <p className="font-bold text-green-800 text-lg">Net Monthly Savings: ₹{result.monthlySavings}</p>
                            <p className="font-medium text-green-700 text-xs">Annual Savings: ₹{result.annualSavings}</p>
                         </div>
                    </div>
                </div>
            </div>
        );
     }


    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleLinesSubmit} className="space-y-6 text-center">
                        <div>
                            <label htmlFor="lines" className="block text-lg font-bold text-gray-800 mb-3">How many mobile lines do you currently have?</label>
                            <input type="number" id="lines" value={lines} onChange={(e) => setLines(e.target.value)}
                                className="w-full max-w-xs mx-auto px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#e60000] focus:border-[#e60000] transition text-center text-xl"
                                placeholder="e.g., 3" min="1" max="10" required autoFocus />
                        </div>
                        <button type="submit" className="bg-[#e60000] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Next →</button>
                    </form>
                );
            case 2:
                return (
                    <form onSubmit={handleSpendingSubmit} className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 text-center">Great! Let's understand your current spending for {lines} lines:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
                            {lineSpends.map((_, index) => (
                                <div key={index}>
                                    <label htmlFor={`line-${index}`} className="block text-sm font-medium text-gray-600">Line {index + 1} Monthly Bill</label>
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500">₹</span></div>
                                        <input type="number" id={`line-${index}`} value={lineSpends[index] || ''}
                                            onChange={(e) => {
                                                const spends = [...lineSpends];
                                                spends[index] = parseInt(e.target.value, 10) || 0;
                                                setLineSpends(spends);
                                            }}
                                            className="w-full pl-7 pr-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#e60000] focus:border-[#e60000] transition"
                                            placeholder="e.g., 450" required />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-4 pt-4">
                             <button type="button" onClick={() => setStep(1)} className="text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">← Back</button>
                             <button type="submit" className="bg-[#e60000] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Next →</button>
                        </div>
                    </form>
                );
            case 3:
                return (
                    <form onSubmit={handleCalculate} className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 text-center">Do you subscribe to any of these OTT services?</h3>
                        <p className="text-center text-sm text-gray-500 -mt-2 mb-4">Select all that apply and enter your monthly cost.</p>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                            {ottServices.map(ott => (
                                <div key={ott.key} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                                    <input type="checkbox" id={ott.key} checked={selectedOtts[ott.key].selected}
                                        onChange={e => handleOttChange(ott.key, 'selected', e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-[#e60000] focus:ring-[#e60000]" />
                                    <label htmlFor={ott.key} className="flex-grow text-sm font-medium text-gray-700">{ott.name}</label>
                                    <div className="relative">
                                        <div className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ${selectedOtts[ott.key].selected ? 'text-gray-500' : 'text-gray-300'}`}>₹</div>
                                        <input type="number" placeholder="Cost"
                                            disabled={!selectedOtts[ott.key].selected}
                                            value={selectedOtts[ott.key].cost || ''}
                                            onChange={e => handleOttChange(ott.key, 'cost', parseInt(e.target.value, 10) || 0)}
                                            className="w-28 pl-7 pr-2 py-1.5 text-sm rounded-md border border-gray-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-4 pt-4">
                             <button type="button" onClick={() => setStep(2)} className="text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">← Back</button>
                            <button type="submit" className="bg-[#e60000] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Calculate Savings</button>
                        </div>
                    </form>
                );
            case 4:
                const numLines = parseInt(lines, 10);
                if (numLines === 1) return <div className="text-center"><p className="text-lg font-semibold">VI Max Family plans are designed for families with 2+ members. However, you can invite family members to join at ₹299 each and share the benefits!</p><button onClick={handleReset} className="mt-6 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">Start Over</button></div>;
                if (numLines > 9) return <div className="text-center"><p className="text-lg font-semibold">You have more than 9 lines. Please contact VI customer support for enterprise plans.</p><button onClick={handleReset} className="mt-6 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">Start Over</button></div>;
                
                if (!results || results.length === 0) {
                    return (
                        <div className="text-center p-4">
                            <h3 className="text-2xl font-extrabold text-gray-900">You already have the best plan!</h3>
                            <p className="mt-2 text-gray-600">No additional savings available based on your current spending.</p>
                            <p className="mt-4 text-sm text-gray-700 font-semibold">However, you can enhance your experience by:</p>
                             <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                                <li>Inviting more family members at ₹299 each</li>
                                <li>Upgrading to a higher plan for more data and benefits</li>
                            </ul>
                            <button onClick={handleReset} className="mt-6 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">Calculate Again</button>
                        </div>
                    );
                }
                
                const bestResult = results[0];
                const totalCurrentSpending = lineSpends.reduce((a, b) => a + b, 0) + Object.values(selectedOtts).reduce((acc, ott) => acc + (ott.selected ? ott.cost : 0), 0);
                const whatsappMessage = `Namaste, I used the calculator for ${lines} lines. My current spend is ₹${totalCurrentSpending}. I'm interested in the ${bestResult.planDetails.name} plan to save ₹${bestResult.monthlySavings}/month. Please help me switch.`;

                return (
                     <div className="text-center space-y-8">
                        <div id="savings-report">
                            <div className="p-2">
                                <h3 className="text-2xl font-extrabold text-gray-900">Your Personal Savings Report</h3>
                                <p className="text-gray-600 mt-1">{results.length > 1 ? "We found multiple options that save you money. The best is highlighted." : "We found the best plan with positive savings for you."}</p>
                            </div>
                            
                            <CurrentSpendingBreakdown />

                            <div className="w-full text-center my-4">
                                <span className="inline-block text-xl font-bold text-gray-400">VS</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 -mb-4">{results.length > 1 ? "Your Recommended VI Plans" : "Your Recommended VI Plan"}</h3>
                            
                            <div className={`grid gap-8 ${results.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                                {results.map((res, index) => <PlanResultBreakdown key={index} result={res} isBest={index === 0} />)}
                            </div>

                            {results.length > 1 && (
                                <div className="border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-xl p-4 sm:p-6 text-left text-sm flex items-start gap-4">
                                    <LightBulbIcon className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base mb-1">Key Insight & Recommendation</h3>
                                        <p className="text-gray-800 font-semibold">Choose {bestResult.planDetails.name} + {bestResult.addOns > 0 ? `${bestResult.addOns} Add-on` : ''}.</p>
                                        <p className="mt-1 text-gray-700"><b>Why?</b> It saves you <b>₹{bestResult.monthlySavings - (results[1]?.monthlySavings || 0)} MORE</b> per month than the other option and includes extra benefits like {bestResult.planDetails.exclusiveBenefits.join(', ')}.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                         <div className="space-y-4 pt-4">
                             <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <a href={`https://wa.me/919913397555?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all shadow-lg">
                                    <WhatsappIcon className="h-6 w-6 mr-3" />
                                    Switch & Save ₹{bestResult.monthlySavings}/month
                                </a>
                                <button id="download-pdf-button" onClick={handleDownloadPdf} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-bold rounded-full text-white bg-gray-700 hover:bg-gray-800 transform hover:scale-105 transition-all shadow-lg">
                                    <DocumentArrowDownIcon className="h-6 w-6 mr-3" />
                                    Download Report
                                </button>
                            </div>
                            <button onClick={handleReset} className="block w-full sm:w-auto mx-auto text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                                Calculate Again
                            </button>
                        </div>
                     </div>
                );
            default: return null;
        }
    };
    
    const progress = useMemo(() => {
        if (step === 1) return '25%';
        if (step === 2) return '50%';
        if (step === 3) return '75%';
        return '100%';
    }, [step]);

    return (
        <section id="calculator" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center items-center h-16 w-16 mx-auto bg-red-100 rounded-full mb-4">
                        <CalculatorIcon className="h-8 w-8 text-[#e60000]" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">VI Postpaid Plan Calculator</h2>
                    <p className="mt-4 text-lg text-gray-600">Find the best plan and see how much you can save by eliminating duplicate OTT bills!</p>
                </div>

                <div className="mt-12 max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-500">
                    {step < 4 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                            <div className="bg-[#e60000] h-2.5 rounded-full transition-all duration-500" style={{ width: progress }}></div>
                        </div>
                    )}
                    {error && <div className="mb-4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate-pulse">{error}</div>}
                    {renderStepContent()}
                </div>
            </div>
        </section>
    );
};

export default SavingsCalculator;