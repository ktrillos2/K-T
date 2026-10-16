"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { PROJECTS } from "@/lib/projects";
import type { SanityReview } from "@/lib/sanity";
import styles from "./admin.module.css";

type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit";
  review?: SanityReview;
};

export default function AdminReviewsPage() {
  const [pin, setPin] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<SanityReview[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all" | "rejected">("pending");
  const [search, setSearch] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);

  // Estado del modal de crear / editar
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: "create" });
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    project: "",
    content: "",
    rating: 5,
    status: "approved" as "approved" | "pending" | "rejected",
    avatarAssetId: "",
    avatarUrl: "",
  });
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Cargar PIN guardado en la sesión
  useEffect(() => {
    const savedPin = sessionStorage.getItem("kt_admin_pin");
    if (savedPin) {
      setPin(savedPin);
      fetchReviews(savedPin);
    }
  }, []);

  const fetchReviews = async (pinToUse: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/reviews", {
        headers: { "x-admin-pin": pinToUse },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (res.status === 401) {
          setIsAuth(false);
          setAuthError("Clave de administración incorrecta");
        } else {
          setAuthError(data.error || "Error al cargar las reseñas");
        }
        return;
      }
      setIsAuth(true);
      sessionStorage.setItem("kt_admin_pin", pinToUse);
      setReviews(data.reviews || []);
    } catch (err) {
      setAuthError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    fetchReviews(pin);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kt_admin_pin");
    setIsAuth(false);
    setPin("");
    setReviews([]);
  };

  // Acciones sobre reseñas (Aprobar, Rechazar, Estado)
  const updateStatus = async (id: string, newStatus: "approved" | "pending" | "rejected") => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Error al actualizar");

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      showToast(
        newStatus === "approved"
          ? "✓ Reseña aprobada y visible en la web"
          : newStatus === "rejected"
          ? "Reseña marcada como rechazada"
          : "Reseña devuelta a pendientes"
      );
    } catch (err) {
      showToast("✗ Error al actualizar estado");
    }
  };

  // Eliminar reseña
  const deleteReview = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar permanentemente la reseña de "${name}" en Sanity?`)) return;

    try {
      const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": pin },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Error al eliminar");

      setReviews((prev) => prev.filter((r) => r._id !== id));
      showToast("✓ Reseña eliminada de Sanity");
    } catch (err) {
      showToast("✗ Error al eliminar reseña");
    }
  };

  // Subir imagen a Sanity Assets CDN
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-pin": pin },
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Error al subir imagen");

      setFormData((prev) => ({
        ...prev,
        avatarAssetId: data.assetId,
        avatarUrl: data.cdnUrl || data.url,
      }));
      showToast("✓ Foto subida al CDN de Sanity");
    } catch (err) {
      showToast("✗ Error al subir foto a Sanity");
    } finally {
      setUploadingImage(false);
    }
  };

  // Abrir modal de creación
  const openCreateModal = () => {
    setFormData({
      name: "",
      role: "",
      project: PROJECTS[0]?.name || "",
      content: "",
      rating: 5,
      status: "approved",
      avatarAssetId: "",
      avatarUrl: "",
    });
    setModal({ isOpen: true, mode: "create" });
  };

  // Abrir modal de edición
  const openEditModal = (r: SanityReview) => {
    setFormData({
      name: r.name,
      role: r.role || "",
      project: r.project || "",
      content: r.content,
      rating: r.rating || 5,
      status: r.status,
      avatarAssetId: r.avatarAssetId || "",
      avatarUrl: r.avatarUrl || "",
    });
    setModal({ isOpen: true, mode: "edit", review: r });
  };

  // Guardar formulario de crear o editar
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      alert("Por favor completa el nombre y el contenido de la reseña.");
      return;
    }

    setLoading(true);
    try {
      if (modal.mode === "create") {
        const res = await fetch("/api/admin/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-pin": pin,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Error al crear");
        showToast("✓ Reseña creada exitosamente en Sanity");
      } else if (modal.mode === "edit" && modal.review) {
        const res = await fetch("/api/admin/reviews", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-pin": pin,
          },
          body: JSON.stringify({
            id: modal.review._id,
            ...formData,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Error al actualizar");
        showToast("✓ Cambios guardados en Sanity");
      }

      setModal({ isOpen: false, mode: "create" });
      await fetchReviews(pin);
    } catch (err) {
      showToast("✗ Error al guardar en Sanity");
    } finally {
      setLoading(false);
    }
  };

  // Filtros y KPIs
  const totalCount = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;

  const avgRating = useMemo(() => {
    if (!reviews.length) return "5.0";
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (activeTab === "pending" && r.status !== "pending") return false;
      if (activeTab === "approved" && r.status !== "approved") return false;
      if (activeTab === "rejected" && r.status !== "rejected") return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesProject = (r.project || "").toLowerCase().includes(q);
        const matchesContent = r.content.toLowerCase().includes(q);
        return matchesName || matchesProject || matchesContent;
      }
      return true;
    });
  }, [reviews, activeTab, search]);

  // Pantalla de Login / Clave de administración
  if (!isAuth) {
    return (
      <main className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>🔒</div>
          <h1 className={styles.title} style={{ fontSize: "22px", marginBottom: "8px" }}>
            Administración de Reseñas
          </h1>
          <p className={styles.subtitle} style={{ justifyContent: "center", marginBottom: "24px" }}>
            Gestión de testimonios en Sanity CMS · K&T Code
          </p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="password"
              placeholder="Ingresa la clave de administración"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={styles.formInput}
              style={{ textAlign: "center", letterSpacing: "2px", fontSize: "16px" }}
              autoFocus
            />
            {authError && (
              <p style={{ color: "#ff5f56", fontSize: "13px", margin: "0" }}>
                {authError}
              </p>
            )}
            <button type="submit" className={styles.btnPrimary} style={{ justifyContent: "center" }} disabled={loading}>
              {loading ? "Verificando..." : "Acceder al Panel"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className={styles.container}>
      {/* Toast notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#1c1c1f",
            color: "#f2f2ee",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brandWrap}>
          <span className={styles.logoBadge}>Sanity CMS</span>
          <div>
            <h1 className={styles.title}>Administración de Reseñas</h1>
            <p className={styles.subtitle}>
              <span className={styles.statusDot} />
              Sanity CDN Conectado · Proyecto: <code>bc3zxc91</code> (production)
            </p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button type="button" onClick={openCreateModal} className={styles.btnPrimary}>
            + Nueva Reseña
          </button>
          <a href="/testimonios" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
            Ver en la web ↗
          </a>
          <button type="button" onClick={() => fetchReviews(pin)} className={styles.btnSecondary} title="Recargar de Sanity">
            ↻
          </button>
          <button type="button" onClick={handleLogout} className={styles.btnLogout} title="Cerrar sesión">
            Salir
          </button>
        </div>
      </header>

      <main>
        {/* KPI Summary Cards */}
        <section className={styles.kpis} aria-label="Estadísticas de Reseñas">
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Pendientes de Aprobación</div>
            <div className={`${styles.kpiValue} ${pendingCount > 0 ? styles.kpiPending : ""}`}>
              {pendingCount}
              {pendingCount > 0 && <span style={{ fontSize: "14px", fontWeight: "normal" }}>por revisar</span>}
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Aprobadas en la Web</div>
            <div className={`${styles.kpiValue} ${styles.kpiApproved}`}>
              {approvedCount}
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Total Registradas</div>
            <div className={styles.kpiValue}>{totalCount}</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Calificación Promedio</div>
            <div className={styles.kpiValue}>
              {avgRating} <span style={{ color: "#f5a623", fontSize: "20px" }}>★</span>
            </div>
          </div>
        </section>

        {/* Toolbar: Filtros y Buscador */}
        <section className={styles.toolbar} aria-label="Filtros y Búsqueda">
          <div className={styles.tabs} role="tablist">
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "pending" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pendientes
              {pendingCount > 0 && <span className={`${styles.badge} ${styles.badgeAlert}`}>{pendingCount}</span>}
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "approved" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Aprobadas <span className={styles.badge}>{approvedCount}</span>
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Todas <span className={styles.badge}>{totalCount}</span>
            </button>
            {rejectedCount > 0 && (
              <button
                type="button"
                className={`${styles.tab} ${activeTab === "rejected" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("rejected")}
              >
                Rechazadas <span className={styles.badge}>{rejectedCount}</span>
              </button>
            )}
          </div>

          <div className={styles.searchBox}>
            <input
              type="search"
              placeholder="Buscar por cliente, proyecto o texto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </section>

        {/* Lista de Reseñas */}
        <section className={styles.grid} aria-label="Lista de Reseñas">
          {filteredReviews.length === 0 ? (
            <div className={styles.emptyState}>
              <p style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>
                No hay reseñas en este estado
              </p>
              <p style={{ margin: 0, fontSize: "13px" }}>
                {search ? "Intenta con otro término de búsqueda" : "Todas las reseñas han sido gestionadas"}
              </p>
            </div>
          ) : (
            filteredReviews.map((r) => (
              <article
                key={r._id}
                className={`${styles.card} ${
                  r.status === "approved"
                    ? styles.cardApproved
                    : r.status === "rejected"
                    ? styles.cardRejected
                    : styles.cardPending
                }`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.clientMeta}>
                    <div className={styles.avatar}>
                      {r.avatarUrl ? (
                        <img src={r.avatarUrl} alt={r.name} className={styles.avatarImg} />
                      ) : (
                        r.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className={styles.clientInfo}>
                      <h3>{r.name}</h3>
                      <p className={styles.clientRole}>
                        {r.role ? `${r.role} · ` : ""}
                        <span className={styles.projectTag}>
                          {r.project || "Proyecto General"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`${styles.statusBadge} ${
                      r.status === "approved"
                        ? styles.statusApproved
                        : r.status === "rejected"
                        ? styles.statusRejected
                        : styles.statusPending
                    }`}
                  >
                    {r.status === "approved"
                      ? "● Aprobada en Web"
                      : r.status === "rejected"
                      ? "✕ Rechazada"
                      : "⏳ Pendiente"}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.ratingStars} aria-label={`${r.rating || 5} estrellas`}>
                    {"★".repeat(r.rating || 5)}
                  </div>
                  <blockquote className={styles.reviewText}>
                    “{r.content}”
                  </blockquote>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={styles.dateTag}>
                      Registrada el: {r._createdAt ? new Date(r._createdAt).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" }) : "Reciente"}
                    </span>
                    {r.avatarUrl && (
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                        Foto en Sanity CDN ✓
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.actionGroup}>
                    {r.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(r._id, "approved")}
                        className={styles.btnApprove}
                      >
                        ✓ Aprobar para la Web
                      </button>
                    )}

                    {r.status === "approved" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(r._id, "pending")}
                        className={styles.btnEdit}
                      >
                        Mover a Pendientes
                      </button>
                    )}

                    {r.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(r._id, "rejected")}
                        className={styles.btnReject}
                      >
                        Rechazar
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => openEditModal(r)}
                      className={styles.btnEdit}
                    >
                      ✎ Editar
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteReview(r._id, r.name)}
                    className={styles.btnDelete}
                    title="Eliminar de Sanity"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      {/* Modal Crear / Editar */}
      {modal.isOpen && (
        <div className={styles.modalOverlay} onClick={() => setModal({ isOpen: false, mode: "create" })}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{modal.mode === "create" ? "Nueva Reseña de Cliente" : "Editar Reseña"}</h2>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setModal({ isOpen: false, mode: "create" })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReview} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Nombre del Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carolina Restrepo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Cargo o Empresa</label>
                <input
                  type="text"
                  placeholder="Ej: Directora de Operaciones"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Proyecto del Portafolio</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className={styles.formSelect}
                >
                  <option value="">-- Sin proyecto asignado --</option>
                  {PROJECTS.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Calificación (Estrellas)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className={styles.formSelect}
                >
                  <option value={5}>★★★★★ (5 estrellas - Excelente)</option>
                  <option value={4}>★★★★☆ (4 estrellas - Muy bueno)</option>
                  <option value={3}>★★★☆☆ (3 estrellas - Bueno)</option>
                  <option value={2}>★★☆☆☆ (2 estrellas - Regular)</option>
                  <option value={1}>★☆☆☆☆ (1 estrella - Malo)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Contenido del Testimonio *</label>
                <textarea
                  required
                  placeholder="Escribe la experiencia o testimonio del cliente..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Estado en Sanity</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "approved" | "pending" | "rejected",
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="approved">Aprobada (Visible de inmediato en la web)</option>
                  <option value="pending">Pendiente de revisión</option>
                  <option value="rejected">Rechazada (Oculta)</option>
                </select>
              </div>

              {/* Subida de foto a Sanity CDN */}
              <div className={styles.formGroup}>
                <label>Foto / Avatar del Cliente (Sanity CDN)</label>
                {formData.avatarUrl ? (
                  <div className={styles.avatarPreview}>
                    <img src={formData.avatarUrl} alt="Preview" className={styles.avatarPreviewImg} />
                    <div style={{ flex: 1, fontSize: "13px" }}>
                      <p style={{ margin: "0 0 4px", fontWeight: "600", color: "#62c453" }}>
                        ✓ Imagen alojada en Sanity CDN
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatarUrl: "", avatarAssetId: "" })}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ff5f56",
                          padding: 0,
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Quitar foto
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.uploadZone}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#f2f2ee" }}>
                      {uploadingImage ? "Subiendo a Sanity..." : "Haz clic para subir foto del cliente"}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "rgba(242, 242, 238, 0.5)" }}>
                      PNG, JPG, WebP · Se optimizará automáticamente en el CDN de Sanity
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setModal({ isOpen: false, mode: "create" })}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={loading || uploadingImage}>
                  {loading ? "Guardando en Sanity..." : modal.mode === "create" ? "Publicar Reseña" : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer obligatorio según GEMINI.md */}
      <footer className={styles.adminFooter}>
        <a
          href="https://www.kytcode.lat"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.brandLink}
        >
          Desarrollado por K&T <span className={styles.heart}>🤍</span>
        </a>
        <div style={{ marginTop: "6px", fontSize: "12px", color: "rgba(242, 242, 238, 0.4)" }}>
          © {new Date().getFullYear()} K&T CODE. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
