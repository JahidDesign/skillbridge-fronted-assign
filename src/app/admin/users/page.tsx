"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Loader2, Shield, ShieldOff, Star } from "lucide-react";
import { adminApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { formatDate, getAvatarUrl, formatCurrency } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const load = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (roleFilter !== "ALL") params.role = roleFilter;
      const data = await adminApi.getUsers(params);
      setUsers(data);
    } catch {
      toast({ title: "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [search, roleFilter]);

  const toggleBan = async (user: any) => {
    try {
      await adminApi.updateUser(user.id, { isBanned: !user.isBanned });
      toast({ title: user.isBanned ? "User unbanned" : "User banned" });
      load();
    } catch {
      toast({ title: "Action failed", variant: "destructive" });
    }
  };

  const roleColor: Record<string, string> = {
    STUDENT: "info",
    TUTOR: "warning",
    ADMIN: "destructive",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground text-sm">{users.length} users total</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            <SelectItem value="STUDENT">Students</SelectItem>
            <SelectItem value="TUTOR">Tutors</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No users found</div>
          ) : (
            <div className="divide-y">
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <Image
                    src={u.avatar || getAvatarUrl(u.name)}
                    alt={u.name}
                    width={40} height={40}
                    className="rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{u.name}</p>
                      {u.isBanned && <span className="text-xs text-destructive font-medium">BANNED</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                    {u.tutorProfile && (
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {u.tutorProfile.rating} · {formatCurrency(u.tutorProfile.hourlyRate)}/hr
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={roleColor[u.role] as any}>{u.role}</Badge>
                    <span className="text-xs text-muted-foreground hidden sm:block">{formatDate(u.createdAt)}</span>
                    {u.role !== "ADMIN" && (
                      <Button
                        size="sm"
                        variant={u.isBanned ? "outline" : "ghost"}
                        onClick={() => toggleBan(u)}
                        className={u.isBanned ? "text-green-600" : "text-destructive hover:bg-red-50"}
                      >
                        {u.isBanned ? (
                          <><Shield className="w-3.5 h-3.5 mr-1" /> Unban</>
                        ) : (
                          <><ShieldOff className="w-3.5 h-3.5 mr-1" /> Ban</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
