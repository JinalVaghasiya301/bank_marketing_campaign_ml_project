'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Phone, Target, Shield, Building, CreditCard, Home, Zap, Calendar, Clock, DollarSign, AlertTriangle, BarChart3, PieChart } from 'lucide-react';

export default function TermDepositPredictionPage() {
  const [formData, setFormData] = useState({
    age: '41',
    default: 'no',
    balance: '548',
    housing: 'no',
    loan: 'no',
    contact: 'cellular',
    duration: '180',
    campaign: '2',
    pdays: '-1',
    poutcome: 'unknown',
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientFields = [
    {
      name: 'age',
      label: 'Customer Age',
      icon: Users,
      type: 'number',
      description: 'Age of customer (18-95 years)',
      placeholder: '41',
    },
    {
      name: 'default',
      label: 'Credit Default',
      icon: CreditCard,
      type: 'select',
      description: 'Has customer defaulted on credit?',
      options: [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
      ],
    },
    {
      name: 'balance',
      label: 'Account Balance',
      icon: DollarSign,
      type: 'number',
      description: 'Average yearly balance in euros',
      placeholder: '548',
    },
    {
      name: 'housing',
      label: 'Housing Loan',
      icon: Home,
      type: 'select',
      description: 'Does customer have housing loan?',
      options: [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
      ],
    },
    {
      name: 'loan',
      label: 'Personal Loan',
      icon: CreditCard,
      type: 'select',
      description: 'Does customer have personal loan?',
      options: [
        { value: 'no', label: 'No' },
        { value: 'yes', label: 'Yes' },
      ],
    },
  ];

  const campaignFields = [
    {
      name: 'contact',
      label: 'Contact Method',
      icon: Phone,
      type: 'select',
      description: 'How was customer contacted?',
      options: [
        { value: 'cellular', label: 'Cellular' },
        { value: 'telephone', label: 'Telephone' },
      ],
    },
    {
      name: 'duration',
      label: 'Call Duration',
      icon: Clock,
      type: 'number',
      description: 'Last contact duration in seconds',
      placeholder: '180',
    },
    {
      name: 'campaign',
      label: 'Campaign Contacts',
      icon: Target,
      type: 'number',
      description: 'Number of contacts in this campaign',
      placeholder: '2',
    },
    {
      name: 'pdays',
      label: 'Days Since Last Contact',
      icon: Calendar,
      type: 'number',
      description: 'Days since last contact (-1 = never)',
      placeholder: '-1',
    },
    {
      name: 'poutcome',
      label: 'Previous Outcome',
      icon: Target,
      type: 'select',
      description: 'Outcome of previous campaign',
      options: [
        { value: 'unknown', label: 'Unknown' },
        { value: 'failure', label: 'Failure' },
        { value: 'other', label: 'Other' },
        { value: 'success', label: 'Success' },
      ],
    },
  ];

  const renderField = (field: any) => {
    const Icon = field.icon;
    return (
      <div className="dark:bg-gray-800 bg-white rounded-xl p-6 shadow-lg dark:border-gray-700 border border-gray-200">
        <div className="flex items-center mb-4">
          <Icon className="h-5 w-5 mr-3 dark:text-blue-400 text-blue-600" />
          <label className="font-semibold text-lg dark:text-white text-gray-900">{field.label}</label>
        </div>
        <p className="text-sm mb-4 dark:text-gray-400 text-gray-600">{field.description}</p>
        
        {field.type === 'select' ? (
          <Select 
            value={formData[field.name as keyof typeof formData]} 
            onValueChange={(value) => {
              setFormData(prev => {
                const newFormData = { ...prev };
                (newFormData as any)[field.name] = value;
                return newFormData;
              });
            }}
          >
            <SelectTrigger className="w-full dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-300 dark:text-white">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200">
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value} className="dark:text-white text-gray-900">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={field.type}
            value={formData[field.name as keyof typeof formData]}
            onChange={(e: any) => {
              setFormData(prev => {
                const newFormData = { ...prev };
                (newFormData as any)[field.name] = e.target.value;
                return newFormData;
              });
            }}
            placeholder={field.placeholder}
            className="w-full dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-300 dark:text-white"
          />
        )}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        age: parseFloat(formData.age),
        default: formData.default,
        balance: parseFloat(formData.balance),
        housing: formData.housing,
        loan: formData.loan,
        contact: formData.contact,
        duration: parseFloat(formData.duration),
        campaign: parseFloat(formData.campaign),
        pdays: parseFloat(formData.pdays),
        poutcome: formData.poutcome,
      };

      const response = await fetch('https://bank-marketing-campaign-ml-project.onrender.com/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      
      const result: any = {
        prediction: data.prediction || 'NO',
        confidence: data.confidence || 0,
        probability_yes: data.probability_yes || 0,
        probability_no: data.probability_no || 1,
        risk_score: data.risk_score || 10,
        recommendation: data.recommendation || 'Unable to generate recommendation due to invalid input',
        factors: data.factors || ['Invalid input detected'],
        success_rate: data.success_rate || 0,
        dataset_info: data.dataset_info
      };
      
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Term Deposit Prediction
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advanced AI-powered prediction system for bank term deposit subscriptions
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Secure & Private
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              88.5% Accuracy
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
            <CardHeader className="text-center pb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
              <CardTitle className="text-3xl font-bold text-white flex items-center justify-center">
                <Building className="h-8 w-8 mr-3" />
                Customer Information
              </CardTitle>
              <CardDescription className="text-lg text-blue-100 dark:text-blue-200">
                Complete all sections to generate comprehensive prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {clientFields.map(renderField)}
                  {campaignFields.map(renderField)}
                </div>

                <div className="flex justify-center pt-8">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Customer Data...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Generate Prediction
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="dark:bg-red-900/50 bg-red-50 dark:border-red-700 border-red-200 shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <span className="dark:text-red-200 text-red-800">{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl overflow-hidden">
                <div className={`bg-gradient-to-r p-8 text-center ${
                    result.prediction === 'YES' 
                      ? 'from-green-500 to-emerald-600' 
                      : 'from-red-500 to-orange-600'
                  }`}>
                  <div className="text-6xl font-bold mb-3 text-white">
                    {result.prediction === 'YES' ? '✅ YES' : '❌ NO'}
                  </div>
                  <div className="text-white/90 text-xl">
                    Will {result.prediction === 'YES' ? 'Subscribe' : 'Not Subscribe'} to Term Deposit
                  </div>
                  <div className="mt-4 text-white/80 text-lg">
                    Confidence: {(result.confidence).toFixed(1)}%
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold dark:text-white text-gray-900 flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2" />
                      Probability Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium dark:text-green-400 text-green-600">Will Subscribe</span>
                          <span className="font-bold dark:text-green-400 text-green-600">{(result.probability_yes * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-500 h-3 rounded-full" 
                            style={{ width: `${result.probability_yes * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium dark:text-red-400 text-red-600">Will Not Subscribe</span>
                          <span className="font-bold dark:text-red-400 text-red-600">{(result.probability_no * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full" 
                            style={{ width: `${result.probability_no * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold dark:text-white text-gray-900 flex items-center">
                      <Shield className="h-6 w-6 mr-2" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-4 ${
                        result.risk_score <= 3 
                          ? 'dark:text-green-400 text-green-600'
                          : result.risk_score <= 6
                          ? 'dark:text-yellow-400 text-yellow-600'
                          : 'dark:text-red-400 text-red-600'
                      }`}>
                        {result.risk_score.toFixed(1)}
                      </div>
                      <div className={`text-lg font-medium ${
                        result.risk_score <= 3 
                          ? 'dark:text-green-400 text-green-600'
                          : result.risk_score <= 6
                          ? 'dark:text-yellow-400 text-yellow-600'
                          : 'dark:text-red-400 text-red-600'
                      }`}>
                        {result.risk_score <= 3 ? 'Low Risk' : result.risk_score <= 6 ? 'Medium Risk' : 'High Risk'}
                      </div>
                      <div className="mt-4 text-sm dark:text-gray-400 text-gray-600">
                        Risk Score (1-10 scale)
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold dark:text-white text-gray-900 flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Key Prediction Factors
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400 text-gray-600">
                    Variables influencing term deposit subscription likelihood
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {result.factors.map((factor: string, index: number) => (
                      <div key={index} className="flex items-center p-4 dark:bg-gray-700 bg-gray-50 rounded-lg border dark:border-gray-600 border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold dark:text-white text-gray-900 leading-tight">
                            {factor}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold dark:text-white text-gray-900 flex items-center">
                    <Zap className="h-6 w-6 mr-2" />
                    Strategic Recommendation
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400 text-gray-600">
                    Personalized insights for term deposit conversion
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="p-4 dark:bg-blue-900/20 bg-blue-50 rounded-lg border dark:border-blue-700 border-blue-200">
                    <div className="whitespace-pre-line text-sm dark:text-blue-100 text-blue-800 leading-relaxed">
                      {result.recommendation}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.dataset_info && (
                <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold dark:text-white text-gray-900 flex items-center">
                      <PieChart className="h-6 w-6 mr-2" />
                      Dataset Information
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400 text-gray-600">
                      UCI Bank Marketing Dataset specifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 dark:bg-purple-900/20 bg-purple-50 rounded-lg border dark:border-purple-700 border-purple-200">
                        <div className="text-xs dark:text-purple-400 text-purple-600 mb-1">Source</div>
                        <div className="text-sm font-bold dark:text-purple-100 text-purple-800">
                          {result.dataset_info.source}
                        </div>
                      </div>
                      <div className="p-4 dark:bg-purple-900/20 bg-purple-50 rounded-lg border dark:border-purple-700 border-purple-200">
                        <div className="text-xs dark:text-purple-400 text-purple-600 mb-1">Total Records</div>
                        <div className="text-sm font-bold dark:text-purple-100 text-purple-800">
                          {result.dataset_info.instances.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4 dark:bg-purple-900/20 bg-purple-50 rounded-lg border dark:border-purple-700 border-purple-200">
                        <div className="text-xs dark:text-purple-400 text-purple-600 mb-1">Features</div>
                        <div className="text-sm font-bold dark:text-purple-100 text-purple-800">
                          {result.dataset_info.features}
                        </div>
                      </div>
                      <div className="p-4 dark:bg-purple-900/20 bg-purple-50 rounded-lg border dark:border-purple-700 border-purple-200">
                        <div className="text-xs dark:text-purple-400 text-purple-600 mb-1">Target Variable</div>
                        <div className="text-sm font-bold dark:text-purple-100 text-purple-800">
                          {result.dataset_info.target}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
