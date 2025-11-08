import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { StarIcon } from './icons/StarIcon';
import { DocumentArrowDownIcon } from './icons/DocumentArrowDownIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
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
        const userOtts = Object.keys(selectedOtts)
            .filter((key) => selectedOtts[key].selected && selectedOtts[key].cost > 0)
            .map((key) => ({ key, cost: selectedOtts[key].cost, name: ottServices.find(o => o.key === key)?.name || key }));

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
                 planScenarios.push({ planKey: '1201', addOns: 0 });
                 if(selectedOtts.netflix.selected) {
                    const plan871Cost = planData['871'].price + 2*299;
                    const plan1201Cost = planData['1201'].price;
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
        
        const ottCosts = Object.keys(selectedOtts).map(key => selectedOtts[key].cost);
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
            const buttonsContainer = document.getElementById('report-buttons');
            if (buttonsContainer) buttonsContainer.style.visibility = 'hidden';

            html2canvas(reportElement, {
                scale: 2,
                useCORS: true, 
                backgroundColor: '#ffffff'
            }).then(canvas => {
                if (buttonsContainer) buttonsContainer.style.visibility = 'visible';

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
                 if (buttonsContainer) buttonsContainer.style.visibility = 'visible';
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
        setSelectedOtts(ottServices.reduce<OttSelection>((acc, ott) => ({ ...acc, [ott.key]: { selected: false, cost: 0 } }), {}));
        setResults(null);
        setError('');
    };
    
    const CurrentSpendingBreakdown: React.FC = () => {
        const currentLineSpending = lineSpends.reduce((a, b) => a + b, 0);
        const userOtts = Object.keys(selectedOtts)
            .filter((key) => selectedOtts[key].selected && selectedOtts[key].cost > 0)
            .map((key) => ({ key, cost: selectedOtts[key].cost, name: ottServices.find(o => o.key === key)?.name || key }));
        const currentOttSpending = userOtts.reduce((acc, ott) => acc + ott.cost, 0);
        const totalCurrentSpending = currentLineSpending + currentOttSpending;

        return (
             <div className="border border-red-200 bg-red-50/50 rounded-xl p-4 sm:p-6 text-left text-sm">
                <h3 className="font-bold text-red-900 text-base mb-4">👎 Your Current Monthly Spending</h3>
                <div className="space-y-3">
                    <dl className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <dt className="font-semibold text-gray-700">Mobile Lines Subtotal:</dt>
                            <dd className="font-bold text-gray-900">₹{currentLineSpending}</dd>
                        </div>
                        {userOtts.length > 0 && (
                            <div className="flex justify-between items-baseline">
                                <dt className="font-semibold text-gray-700">OTT Subscriptions Subtotal:</dt>
                                <dd className="font-bold text-gray-900">₹{currentOttSpending}</dd>
                            </div>
                        )}
                    </dl>
                </div>
                <div className="mt-4 pt-4 border-t border-red-200 space-y-2">
                     <dl className="space-y-2">
                        <div className="flex justify-between items-baseline text-base">
                            <dt className="font-extrabold text-red-900">Total Monthly Cost:</dt>
                            <dd className="font-extrabold text-red-900">₹{totalCurrentSpending}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        );
    };

    const PlanResultBreakdown: React.FC<{ result: Result, isBest: boolean }> = ({ result, isBest }) => {
         return (
            <div className={`relative border-2 rounded-2xl p-4 sm:p-6 text-left transition-all h-full flex flex-col ${isBest ? 'bg-white border-green-500 shadow-2xl' : 'bg-gray-50/50 border-gray-200'}`}>
                {isBest && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white font-bold text-sm px-4 py-1 rounded-full flex items-center gap-1 shadow-lg"><StarIcon className="h-4 w-4"/> RECOMMENDED</div>}
                
                <h3 className="font-extrabold text-lg text-gray-900 mb-4 text-center sm:text-left">
                    {result.planDetails.name}{result.addOns > 0 ? ` + ${result.addOns} Add-on` : ''}
                </h3>

                <div className="space-y-6 flex-grow">
                    
                     <div className="border border-green-200 bg-green-50/50 rounded-xl p-4 sm:p-6 text-left text-sm">
                        <h3 className="font-bold text-green-900 text-base mb-4">👍 Your New VI Plan</h3>
                         <dl className="space-y-2">
                            <div className="flex justify-between items-baseline text-base">
                                <dt className="font-extrabold text-green-900">New Monthly Cost:</dt>
                                <dd className="font-extrabold text-green-900">₹{result.newPlanCost}</dd>
                            </div>
                        </dl>
                    </div>
                    
                    <div>
                        <p className="font-bold text-sm mb-2 text-gray-800">Key Benefits Included:</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                             <div className="flex items-center gap-2"><PhoneIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">Unlimited Calls</span></div>
                             <div className="flex items-center gap-2"><DataIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">{result.planDetails.dataPrimary} Primary</span></div>
                             <div className="flex items-center gap-2"><DataRolloverIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">200GB Rollover</span></div>
                             <div className="flex items-center gap-2"><ChatBubbleLeftRightIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">3000 SMS</span></div>
                             <div className="flex items-center gap-2"><UsersIcon className="h-5 w-5 text-[#e60000]"/><span className="font-medium">{result.planDetails.includedLines + result.addOns} Lines</span></div>
                        </div>
                    </div>
                    
                    <div>
                        <p className="font-bold text-sm mb-1 text-gray-800">OTT Breakdown:</p>
                        <ul className="space-y-1 text-sm">
                            {result.matchedOtts.map(ott => (
                                <li key={ott.key} className="flex items-center"><CheckIcon className="h-4 w-4 text-green-600 mr-2 flex-shrink-0"/> <span className="font-semibold">{ott.name}</span>&nbsp;is included <span className="text-green-600 ml-auto font-bold">(Saves ₹{ott.cost})</span></li>
                            ))}
                            {result.unmatchedOtts.map(ott => (
                                <li key={ott.key} className="flex items-center"><XCircleIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0"/> <span className="font-semibold">{ott.name}</span>&nbsp;is NOT included <span className="text-red-500 ml-auto font-bold">(Cost ₹{ott.cost})</span></li>
                            ))}
                             {result.matchedOtts.length === 0 && result.unmatchedOtts.length === 0 && <li className="text-gray-500">No OTT services selected.</li>}
                        </ul>
                    </div>

                    <div className="!mt-auto pt-4 border-t border-dashed">
                         <div className="mt-4 text-center bg-green-100 border border-green-200 p-3 rounded-lg">
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
                            <label htmlFor="lines" className="block text-lg font-bold text-gray-800 mb-3">How many mobile lines do you have?</label>
                            <input type="number" id="lines" value={lines} onChange={(e) => setLines(e.target.value)}
                                className="w-full max-w-xs mx-auto px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-[#e60000] focus:border-[#e60000] transition text-center text-xl font-semibold"
                                placeholder="e.g., 3" min="1" max="10" required autoFocus />
                        </div>
                        <button type="submit" className="bg-[#e60000] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Next →</button>
                    </form>
                );
            case 2:
                return (
                    <form onSubmit={handleSpendingSubmit} className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 text-center">Enter your current monthly bill for {lines} lines:</h3>
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
                                            className="w-full pl-7 pr-3 py-2 rounded-md border-2 border-gray-300 focus:ring-1 focus:ring-[#e60000] focus:border-[#e60000] transition"
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
                        <h3 className="text-lg font-bold text-gray-800 text-center">Do you subscribe to any of these services?</h3>
                        <p className="text-center text-sm text-gray-500 -mt-2 mb-4">Select all that apply and enter your monthly cost.</p>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                            {ottServices.map(ott => (
                                <div key={ott.key} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-transparent has-[:checked]:bg-red-50 has-[:checked]:border-red-200 transition-colors">
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
                                            className="w-28 pl-7 pr-2 py-1.5 text-sm rounded-md border-2 border-gray-300 transition disabled:bg-gray-200 disabled:cursor-not-allowed" />
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
                if (numLines === 1) return <div className="text-center p-4"><p className="text-lg font-semibold">VI Max Family plans are for 2+ members. Invite family to join at ₹299 each and share the benefits!</p><button onClick={handleReset} className="mt-6 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">Start Over</button></div>;
                if (numLines > 9) return <div className="text-center p-4"><p className="text-lg font-semibold">For more than 9 lines, please contact us for enterprise plans.</p><button onClick={handleReset} className="mt-6 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">Start Over</button></div>;
                
                if (!results || results.length === 0) {
                    return (
                        <div className="text-center p-4" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
                            <h3 className="text-2xl font-extrabold text-gray-900">Your current plan looks great!</h3>
                            <p className="mt-2 text-gray-600">We couldn't find a VI family plan that offers significant savings based on your entries.</p>
                             <CurrentSpendingBreakdown />
                            <button onClick={handleReset} className="mt-6 bg-[#e60000] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all">Calculate Again</button>
                        </div>
                    );
                }
                
                const bestResult = results[0];
                const totalCurrentSpending = lineSpends.reduce((a, b) => a + b, 0) + Object.keys(selectedOtts).reduce((acc, key) => acc + (selectedOtts[key].selected ? selectedOtts[key].cost : 0), 0);
                const whatsappMessage = `Namaste, I used the calculator for ${lines} lines. My current spend is ₹${totalCurrentSpending}. I'm interested in the ${bestResult.planDetails.name} plan to save ₹${bestResult.monthlySavings}/month. Please help me switch.`;

                return (
                     <div className="text-center space-y-8" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
                        <div id="savings-report" className="bg-white p-4 sm:p-6 rounded-lg">
                             <div className="mb-8">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Your Personal Savings Report</h3>
                                <p className="text-gray-600 mt-1 max-w-2xl mx-auto">{results.length > 1 ? "We found multiple options that save you money. The best is highlighted." : "We found the perfect plan to help you save!"}</p>
                            </div>

                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                <CurrentSpendingBreakdown />
                                <PlanResultBreakdown result={bestResult} isBest={true} />
                            </div>

                            {results.length > 1 && (
                                 <div className="mt-8 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-xl p-4 sm:p-6 text-left text-sm flex items-start gap-4">
                                    <LightBulbIcon className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base mb-1">Expert Recommendation</h3>
                                        <p className="text-gray-800 font-semibold">Choose the {bestResult.planDetails.name} plan.</p>
                                        <p className="mt-1 text-gray-700"><b>Why?</b> It saves you an extra <b>₹{bestResult.monthlySavings - (results[1]?.monthlySavings || 0)} per month</b> compared to the next best option!</p>
                                    </div>
                                </div>
                            )}
                        </div>

                         <div id="report-buttons" className="space-y-4 pt-4 border-t border-gray-200">
                             <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <a href={`https://wa.me/919913397555?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-bold rounded-full text-white bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all shadow-lg">
                                    <WhatsappIcon className="h-6 w-6 mr-3" />
                                    Switch & Save ₹{bestResult.monthlySavings}/month
                                </a>
                                <button onClick={handleDownloadPdf} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-base font-bold rounded-full text-gray-700 bg-white hover:bg-gray-100 transform hover:scale-105 transition-all shadow-sm">
                                    <DocumentArrowDownIcon className="h-6 w-6 mr-3" />
                                    Download Report
                                </button>
                            </div>
                            <button onClick={handleReset} className="block w-full sm:w-auto mx-auto text-gray-600 font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition-colors text-sm">
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
        <section id="calculator" className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-on-scroll fade-in-up">
                    <div className="flex justify-center items-center h-16 w-16 mx-auto bg-red-100 rounded-full mb-4">
                        <CalculatorIcon className="h-8 w-8 text-[#e60000]" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tighter">VI Postpaid Savings Calculator</h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">Find the best family plan and see how much you can save by eliminating duplicate OTT bills!</p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-500 animate-on-scroll fade-in-up" style={{ animationDelay: '200ms' }}>
                    {step < 4 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                            <div className="bg-gradient-to-r from-[#e60000] to-[#ff3333] h-2.5 rounded-full transition-all duration-500" style={{ width: progress }}></div>
                        </div>
                    )}
                    {error && <div className="mb-4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" style={{ animation: 'pulse-glow 1.5s infinite ease-in-out' }}>{error}</div>}
                    <div className="transition-all duration-300">
                        {renderStepContent()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SavingsCalculator;
