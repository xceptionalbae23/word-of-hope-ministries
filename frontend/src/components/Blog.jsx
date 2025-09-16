import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { ministryInfo } from '../mock';

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Blog & Devotionals
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Words of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Inspiration
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay connected with inspiring devotionals, ministry updates, and testimonies from around the world
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-800 to-blue-900 h-64 lg:h-auto flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <BookOpen size={64} className="mx-auto mb-4 text-blue-200" />
                    <p className="text-xl font-bold">Featured Article</p>
                    <p className="text-blue-200">Latest from our ministry</p>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <Badge className="bg-amber-500 text-white mb-4">
                    Featured Post
                  </Badge>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    {ministryInfo.blogPosts[0].title}
                  </h3>
                  <div className="flex items-center gap-4 mb-6 text-slate-500">
                    <span className="flex items-center">
                      <User size={16} className="mr-1" />
                      {ministryInfo.blogPosts[0].author}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(ministryInfo.blogPosts[0].date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {ministryInfo.blogPosts[0].readTime}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                    {ministryInfo.blogPosts[0].excerpt}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-blue-800 hover:bg-blue-900 text-white"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministryInfo.blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center">
                  <BookOpen className="text-slate-400" size={48} />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-800 transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-amber-600 font-medium">By {post.author}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-800 hover:text-blue-900 p-0"
                    >
                      Read More
                      <ArrowRight className="ml-1" size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Stay Connected</h3>
              <p className="text-slate-600 mb-6">
                Subscribe to our newsletter and receive weekly devotionals, ministry updates, and prayer requests directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button 
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8"
                >
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-slate-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Blog Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Explore by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Devotionals',
              'Missions',
              'Leadership',
              'Faith Building',
              'Ministry Updates',
              'Testimonies',
              'Prayer Requests',
              'Bible Study'
            ].map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="cursor-pointer hover:bg-blue-800 hover:text-white hover:border-blue-800 transition-all duration-300 px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;