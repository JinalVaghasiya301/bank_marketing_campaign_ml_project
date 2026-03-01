'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  BarChart3, 
  Target, 
  Brain,
  Zap,
  Award,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Activity
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced ML Prediction',
      description: 'State-of-the-art machine learning algorithms trained on 45,000+ real customer records',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Data Validation',
      description: 'Comprehensive input validation ensures accurate predictions within dataset ranges',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analysis',
      description: 'Instant probability calculations with confidence scores and risk assessments',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Strategic Recommendations',
      description: 'Actionable insights with 6-tier subscription probability ranges',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Interactive Visualizations',
      description: 'Beautiful charts showing probability distributions and risk gauges',
      color: 'pink'
    },
    {
      icon: Users,
      title: 'Customer Segmentation',
      description: 'Detailed factor analysis for personalized marketing strategies',
      color: 'indigo'
    }
  ];

  const stats = [
    { label: 'Dataset Instances', value: '45,211+', icon: Globe },
    { label: 'Features Analyzed', value: '16', icon: Activity },
    { label: 'Model Accuracy', value: '88.5%', icon: Award },
    { label: 'Prediction Speed', value: '< 1s', icon: Zap }
  ];

  const getFeatureColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Intelligent Banking
            <br />
            Prediction System
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Harness the power of machine learning to predict term deposit subscriptions with 
            <span className="font-bold text-blue-600"> 88.5% accuracy</span>. 
            Get real-time insights, strategic recommendations, and comprehensive customer analysis.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/loan">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Try Prediction <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-gray-300 text-gray-900 hover:bg-gray-50 text-gray-600  rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 dark:text-blue-400 text-blue-600" />
                  <div className="text-3xl font-bold mb-2 dark:text-white text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 dark:text-white text-gray-900">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for intelligent banking predictions and customer insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${getFeatureColor(feature.color)} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold dark:text-white text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base dark:text-gray-400 text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl dark:bg-gradient-to-r from-blue-900 to-purple-900 dark:border-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 border">
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-gray-900">
            Ready to Transform Your Banking Strategy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of banking professionals using AI-powered predictions to optimize their marketing campaigns and improve customer relationships.
          </p>
          <Link href="/loan">
            <Button 
              size="lg"
              className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now <Star className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
