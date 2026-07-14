import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { theme } from "../config/theme";
import GlassCard from "../components/UI/GlassCard";
import Button from "../components/UI/Button";

interface Todo {
  id: number;
  name: string;
}

export default function Community() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await supabase.from("todos").select();
        if (data) {
          setTodos(data as Todo[]);
        }
      } catch (err) {
        console.error("Lỗi khi kết nối Supabase:", err);
      }
    }
    getTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ name: newTodoName.trim() }])
        .select();

      if (error) throw error;
      if (data) {
        setTodos([...todos, ...data as Todo[]]);
        setNewTodoName("");
      }
    } catch (err) {
      alert("Không thể thêm ghi chú. Vui lòng kiểm tra bảng RLS hoặc cấu hình Supabase.");
    }
  };

  return (
    <div className={theme.container}>
      <div className="space-y-8">
        <div className="text-center md:text-left space-y-2 border-b border-zinc-900 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white">
            Cộng đồng MMAVN
          </h1>
          <p className="text-xs text-red-500 font-mono tracking-widest uppercase">
            Bảng Tin Tích Hợp Supabase Database
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Supabase Section */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="border border-red-500/10">
              <h2 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
                💬 Bảng Tin / Việc Cần Làm (Todos)
              </h2>
              
              <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTodoName}
                  onChange={(e) => setNewTodoName(e.target.value)}
                  placeholder="Thêm tin nhắn hoặc việc cần làm..."
                  className={theme.input}
                />
                <Button type="submit" variant="primary">Gửi</Button>
              </form>

              {todos.length > 0 ? (
                <ul className="space-y-3 p-0 m-0 list-none">
                  {todos.map((todo) => (
                    <li 
                      key={todo.id} 
                      className="flex items-center justify-between p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors"
                    >
                      <span className="text-sm text-zinc-200">{todo.name}</span>
                      <span className="text-[9px] font-mono text-zinc-600">ID: #{todo.id}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                  Chưa có dữ liệu nào trong bảng. Hãy gửi nội dung đầu tiên!
                </div>
              )}
            </GlassCard>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <GlassCard className="border border-zinc-900">
              <h3 className="font-extrabold text-sm text-white mb-2">Supabase Connection</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Dữ liệu ở cột bên cạnh đang được truy vấn trực tiếp thời gian thực từ cơ sở dữ liệu Supabase của bạn:
              </p>
              <code className="text-[10px] block break-all text-red-400 bg-zinc-950 p-2 rounded border border-zinc-900">
                https://lvdpvkzpmxshxtmqbpqy.supabase.co
              </code>
            </GlassCard>

            <GlassCard className="border border-zinc-900">
              <h3 className="font-extrabold text-sm text-white mb-2">Thống kê diễn đàn</h3>
              <ul className="space-y-2 p-0 m-0 list-none text-xs text-zinc-400 font-mono">
                <li className="flex justify-between">
                  <span>Số lượng bản ghi:</span>
                  <span className="text-red-500 font-bold">{todos.length}</span>
                </li>
                <li className="flex justify-between">
                  <span>Trạng thái kết nối:</span>
                  <span className="text-emerald-500">ONLINE</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
