import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Code, FolderGit2, Mail, LogOut, Plus, Trash2, Eye, EyeOff, Upload, Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { portfolioApi } from '../../services/api';
import type { Profile, Skill, Project, ContactMessage, DashboardOverview } from '../../types/portfolio';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'skills' | 'projects' | 'messages'>('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [newSkill, setNewSkill] = useState({ name: '', category: 'Backend', icon: 'Code', displayOrder: 1, isVisible: true });
  const [newProject, setNewProject] = useState<{
    title: string; shortDescription: string; fullDescription: string; thumbnailUrl: string; category: string; technologies: string[]; gitHubUrl: string; liveDemoUrl: string; projectStatus: string; isFeatured: boolean; isPublished: boolean; displayOrder: number; problemStatement: string; solutionOverview: string; architectureNotes: string;
  }>({
    title: '', shortDescription: '', fullDescription: '', thumbnailUrl: '', category: 'Full-Stack', technologies: ['C#', 'React', 'PostgreSQL'], gitHubUrl: '', liveDemoUrl: '', projectStatus: 'Completed', isFeatured: true, isPublished: true, displayOrder: 1, problemStatement: '', solutionOverview: '', architectureNotes: ''
  });

  const loadData = async () => {
    try {
      const [ov, prof, sk, pr, msgs] = await Promise.all([
        portfolioApi.getAdminOverview().catch(() => null),
        portfolioApi.getProfile(),
        portfolioApi.getSkills(),
        portfolioApi.getProjects(undefined, undefined, 1, 50).then(r => r.items),
        portfolioApi.getAdminMessages().catch(() => []),
      ]);

      if (ov) setOverview(ov);
      if (prof) setProfile(prof);
      if (sk) setSkills(sk);
      if (pr) setProjects(pr);
      if (msgs) setMessages(msgs);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await portfolioApi.updateAdminProfile(profile);
      setFeedback('Profile updated successfully!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Failed to update profile.');
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await portfolioApi.createSkill(newSkill);
      setSkills([...skills, created]);
      setNewSkill({ name: '', category: 'Backend', icon: 'Code', displayOrder: 1, isVisible: true });
      setFeedback('Skill added successfully!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Failed to add skill.');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await portfolioApi.deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch {
      setFeedback('Failed to delete skill.');
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await portfolioApi.createProject(newProject as any);
      setProjects([created, ...projects]);
      setNewProject({
        title: '', shortDescription: '', fullDescription: '', thumbnailUrl: '', category: 'Full-Stack', technologies: ['C#', 'React', 'PostgreSQL'], gitHubUrl: '', liveDemoUrl: '', projectStatus: 'Completed', isFeatured: true, isPublished: true, displayOrder: 1, problemStatement: '', solutionOverview: '', architectureNotes: ''
      });
      setFeedback('Project added successfully!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('Failed to add project.');
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await portfolioApi.togglePublishProject(id);
      setProjects(projects.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p));
    } catch {
      setFeedback('Failed to toggle publish status.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await portfolioApi.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch {
      setFeedback('Failed to delete project.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'profileImage' | 'projectThumbnail') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const data = await portfolioApi.uploadFile(file);
      if (targetField === 'profileImage' && profile) {
        setProfile({ ...profile, profileImageUrl: data.url });
      } else if (targetField === 'projectThumbnail') {
        setNewProject({ ...newProject, thumbnailUrl: data.url });
      }
      setFeedback('File uploaded successfully!');
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback('File upload failed.');
    }
  };

  const handleUpdateMsgStatus = async (id: string, status: string) => {
    try {
      await portfolioApi.updateMessageStatus(id, status);
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
    } catch {
      setFeedback('Failed to update message status.');
    }
  };

  const handleDeleteMsg = async (id: string) => {
    try {
      await portfolioApi.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    } catch {
      setFeedback('Failed to delete message.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#0A1020] border-b md:border-b-0 md:border-r border-[#1E293B] p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
              NK
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Admin Dashboard</h2>
              <p className="text-[10px] text-slate-400">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile Editor', icon: User },
              { id: 'skills', label: 'Skills Manager', icon: Code },
              { id: 'projects', label: 'Projects Manager', icon: FolderGit2 },
              { id: 'messages', label: 'Contact Messages', icon: Mail },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#0E172B]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#1E293B] space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full text-left text-xs text-slate-400 hover:text-cyan-400 py-1.5 transition-colors"
          >
            ← Public Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
        {feedback && (
          <div className="p-4 bg-blue-600/20 border border-blue-500/40 text-cyan-300 text-xs rounded-xl font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B]">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Projects</p>
                <p className="text-3xl font-black text-cyan-400 mt-2">{overview?.totalProjects ?? projects.length}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B]">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Skills</p>
                <p className="text-3xl font-black text-blue-400 mt-2">{overview?.totalSkills ?? skills.length}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B]">
                <p className="text-xs text-slate-400 font-semibold uppercase">Certifications</p>
                <p className="text-3xl font-black text-emerald-400 mt-2">{overview?.totalCertifications ?? 1}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#1E293B]">
                <p className="text-xs text-slate-400 font-semibold uppercase">Unread Messages</p>
                <p className="text-3xl font-black text-rose-400 mt-2">{overview?.unreadMessages ?? messages.filter(m => m.status === 'Unread').length}</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#1E293B] space-y-4">
              <h3 className="text-lg font-bold text-white">Recent Messages Inbox</h3>
              {messages.length === 0 ? (
                <p className="text-xs text-slate-400">No contact messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 5).map(m => (
                    <div key={m.id} className="p-4 bg-[#0A1020] rounded-xl border border-[#1E293B] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{m.fullName} ({m.email})</p>
                        <p className="text-xs text-cyan-400 font-semibold mt-0.5">{m.subject}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] font-mono rounded-md ${m.status === 'Unread' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && profile && (
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-2xl font-bold text-white">Edit Profile Details</h1>

            <form onSubmit={handleProfileSave} className="glass-panel p-6 rounded-2xl border border-[#1E293B] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Headline / Main Title</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Professional Biography</label>
                <textarea
                  rows={4}
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Profile Photo</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={profile.profileImageUrl}
                    onChange={(e) => setProfile({ ...profile, profileImageUrl: e.target.value })}
                    className="flex-1 bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                  <label className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'profileImage')} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={profile.gitHubUrl}
                    onChange={(e) => setProfile({ ...profile, gitHubUrl: e.target.value })}
                    className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={profile.linkedInUrl}
                    onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })}
                    className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Technical Skills Manager</h1>

            <form onSubmit={handleAddSkill} className="glass-panel p-6 rounded-2xl border border-[#1E293B] space-y-4 max-w-2xl">
              <h3 className="text-sm font-bold text-white">Add New Skill</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Skill Name (e.g. Docker)"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                />
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools & Platforms">Tools & Platforms</option>
                  <option value="Architecture & Concepts">Architecture & Concepts</option>
                </select>
              </div>
              <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="glass-panel p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.category}</p>
                  </div>
                  <button onClick={() => handleDeleteSkill(s.id)} className="text-slate-500 hover:text-rose-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Project Portfolio Manager</h1>

            <form onSubmit={handleAddProject} className="glass-panel p-6 rounded-2xl border border-[#1E293B] space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-white">Add New Portfolio Project</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                />
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                </select>
              </div>

              <textarea
                placeholder="Short Description"
                rows={2}
                value={newProject.shortDescription}
                onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none resize-none"
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">Project Image / Screenshot</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newProject.thumbnailUrl}
                    onChange={(e) => setNewProject({ ...newProject, thumbnailUrl: e.target.value })}
                    className="flex-1 bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
                  />
                  <label className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'projectThumbnail')} />
                  </label>
                </div>
              </div>

              <input
                type="text"
                placeholder="Technologies (comma-separated: C#, ASP.NET Core, React)"
                value={Array.isArray(newProject.technologies) ? newProject.technologies.join(', ') : newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full bg-[#0A1020] border border-[#1E293B] text-slate-200 text-xs rounded-xl p-3 outline-none"
              />

              <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Create Project</span>
              </button>
            </form>

            <div className="glass-panel rounded-2xl border border-[#1E293B] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0A1020] text-slate-400 font-semibold border-b border-[#1E293B]">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Published</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0E172B]/50">
                      <td className="p-4 font-bold text-white">{p.title}</td>
                      <td className="p-4 text-slate-400">{p.category}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold ${p.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
                        >
                          {p.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{p.isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 text-slate-500 hover:text-rose-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Contact Messages Inbox</h1>

            {messages.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-2xl border border-[#1E293B] text-slate-400 text-xs">
                No contact messages in database.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="glass-panel p-6 rounded-2xl border border-[#1E293B] space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{m.subject}</h3>
                        <p className="text-xs text-cyan-400 font-semibold">{m.fullName} ({m.email})</p>
                        <p className="text-[10px] text-slate-500 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateMsgStatus(m.id, m.status === 'Read' ? 'Unread' : 'Read')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg ${m.status === 'Read' ? 'bg-slate-800 text-slate-400' : 'bg-blue-600 text-white'}`}
                        >
                          Mark {m.status === 'Read' ? 'Unread' : 'Read'}
                        </button>
                        <button onClick={() => handleDeleteMsg(m.id)} className="p-1.5 text-slate-500 hover:text-rose-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed p-4 bg-[#0A1020] rounded-xl border border-[#1E293B]">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
