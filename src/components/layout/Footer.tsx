import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">SkillBridge</span>
            </div>
            <p className="text-sm text-white/60 max-w-xs">
              Connect with expert tutors and learn anything. Your knowledge journey starts here.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/40">Platform</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/tutors" className="hover:text-white transition-colors">Browse Tutors</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Become a Tutor</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/40">Support</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><span className="cursor-pointer hover:text-white transition-colors">Help Center</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
