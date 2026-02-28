'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Database, 
  Shield, 
  Target, 
  Users, 
  TrendingUp,
  Award,
  BookOpen,
  Code,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  BarChart3,
  Clock,
  Star
} from 'lucide-react';

export default function AboutPage() {
  const datasetFeatures = [
    {
      name: 'UCI Bank Marketing Dataset',
      role: 'Comprehensive Customer Data',
      description: '45,211 customer records with 16 features including age, job, balance, and campaign details for term deposit prediction',
      icon: Database
    },
    {
      name: 'Machine Learning Model',
      role: 'Advanced Classification Algorithm',
      description: 'Trained with 88.5% accuracy using ensemble methods to predict customer subscription behavior',
      icon: Brain
    },
    {
      name: 'Real-time Predictions',
      role: 'Instant Customer Insights',
      description: 'Lightning-fast prediction system that analyzes customer profiles and provides subscription probability in real-time',
      icon: Zap
    }
  ];

  const technologies = [
    { name: 'Machine Learning', icon: Brain, description: 'Advanced algorithms for pattern recognition' },
    { name: 'Data Processing', icon: Database, description: 'Efficient handling of large datasets' },
    { name: 'Web Technologies', icon: Code, description: 'Modern React, TypeScript, and Tailwind CSS' },
    { name: 'API Integration', icon: Zap, description: 'RESTful APIs for seamless connectivity' }
  ];

  const achievements = [
    { metric: '45,211+', label: 'Training Data Points', icon: Database },
    { metric: '88.5%', label: 'Model Accuracy', icon: Award },
    { metric: '16', label: 'Input Features', icon: BarChart3 },
    { metric: '< 1s', label: 'Prediction Time', icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About BankPredict Pro
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing banking predictions with cutting-edge machine learning and comprehensive data analysis. 
            Our mission is to empower financial institutions with actionable insights for better customer relationships.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center dark:text-white text-gray-900">
                <Lightbulb className="mr-3 h-8 w-8 dark:text-yellow-400 text-yellow-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed">
                To democratize advanced banking analytics through accessible, accurate, and intuitive prediction tools. 
                We believe every financial institution should have access to enterprise-grade machine learning capabilities 
                without requiring extensive technical expertise or infrastructure investments.
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center dark:text-white text-gray-900">
                <Target className="mr-3 h-8 w-8 dark:text-blue-400 text-blue-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed">
                To create a world where every banking decision is data-driven, every customer interaction is personalized, 
                and every marketing campaign achieves maximum ROI through intelligent predictions and strategic insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 dark:text-white text-gray-900">
              Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technologies for optimal performance and reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <Icon className="h-12 w-12 mx-auto mb-4 dark:text-blue-400 text-blue-600" />
                    <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-900">
                      {tech.name}
                    </h3>
                    <p className="text-sm dark:text-gray-400 text-gray-600">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 dark:text-white text-gray-900">
              Key Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Numbers that demonstrate our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <Icon className="h-10 w-10 mx-auto mb-4 dark:text-green-400 text-green-600" />
                    <div className="text-3xl font-bold mb-2 dark:text-white text-gray-900">
                      {achievement.metric}
                    </div>
                    <div className="text-sm dark:text-gray-400 text-gray-600">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dataset & Model Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 dark:text-white text-gray-900">
              Dataset & Model Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive data analysis and machine learning capabilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {datasetFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full dark:bg-gradient-to-r from-green-600 to-blue-600 bg-gradient-to-r from-green-500 to-blue-500 p-5">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold dark:text-white text-gray-900">
                      {feature.name}
                    </CardTitle>
                    <CardDescription className="text-base font-medium dark:text-green-400 text-green-600">
                      {feature.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl dark:bg-gradient-to-r from-blue-900 to-purple-900 dark:border-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 border">
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-gray-900">
            Experience the Power of AI-Driven Banking
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how our advanced prediction system can transform your banking operations and customer relationships.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/loan">
              <Button 
                size="lg"
                className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Try Prediction <Star className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-5 text-xl font-semibold dark:border-gray-600 border-gray-300 dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-50 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Back to Home <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
