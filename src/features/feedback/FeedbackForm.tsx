import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export const FeedbackForm = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="max-w-4xl mx-auto p-12 text-center animate-fadeIn">
                <div className="bg-white dark:bg-neutral-950/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-16 shadow-2xl">
                    <div className="w-20 h-20 bg-success-50 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-success-500" />
                    </div>
                    <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-4">Feedback Received!</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-8 max-w-sm mx-auto">
                        Thank you for helping us make CareerSha even better. Our team will review your message shortly.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20"
                    >
                        Send Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Side: Copy */}
                <div className="space-y-6 animate-slide-left-to-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 border border-primary-100/50 dark:border-primary-800/50 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-700 dark:text-primary-400">Beta Feedback</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                        Help Us Shape the <br />
                        <span className="text-primary-600">Future of Education</span>
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-lg font-medium">
                        Your insights are the foundation of our evolution. Share your thoughts, report a bug, or suggest a feature to help us build the ultimate counseling platform.
                    </p>

                    <div className="flex items-center gap-4 text-neutral-400 font-bold text-xs uppercase tracking-widest pt-4">
                        <div className="w-12 h-px bg-neutral-200 dark:bg-neutral-800" />
                        <span>Direct Communication Line</span>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="animate-slide-right-to-left">
                    <div className="bg-white dark:bg-neutral-950/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative group">
                        {/* Inner glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/10 transition-colors" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1 block">Full Name</label>
                                    <div className="relative group/input">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/input:text-primary-500 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Shiva"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-14 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 rounded-2xl pl-12 pr-4 font-bold text-neutral-800 dark:text-neutral-100 outline-none focus:border-primary-500 transition-all placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1 block">Email Address</label>
                                    <div className="relative group/input">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/input:text-primary-500 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            placeholder="shiva@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-14 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 rounded-2xl pl-12 pr-4 font-bold text-neutral-800 dark:text-neutral-100 outline-none focus:border-primary-500 transition-all placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1 block">Your Message</label>
                                <div className="relative group/input">
                                    <div className="absolute left-4 top-5 text-neutral-400 group-focus-within/input:text-primary-500 transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-4 font-bold text-neutral-800 dark:text-neutral-100 outline-none focus:border-primary-500 transition-all placeholder:text-neutral-400 resize-none"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={status === 'submitting'}
                                type="submit"
                                className="w-full h-16 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {status === 'submitting' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
