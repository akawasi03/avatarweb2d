# AVATAR 2.5.8 CLASS MAPPING SPECIFICATION

Bản đồ ánh xạ toàn bộ 320 Java Classes từ `Avatar258.jar` sang TypeScript WebGL Architecture.

## 1. TỔNG QUAN HỆ THỐNG

- Tổng số Java Classes decompiled: **321**
- Entry Point: `main.GameMidlet`
- GameCanvas & Loop: `main.a` (extends `javax.microedition.lcdui.Canvas`)
- Network Session: `kt` (TCP Socket, TEA/XOR Key Handshake)
- Packet Wire: `jr` (Message binary stream)
- Asset System: `c` (NguyenVanMinh XOR archive parser for `.av` containers)
- Tilemap Engine: `ir` (Room map, layers, collisions, waypoints)
- World Map: `ae` (citiMap 26x34 grid matrix)
- Entity & Avatar: `js` (base), `gx` (avatar), `hn` (local player), `hl` (remote player)

## 2. BẢN ĐỒ ÁNH XẠ CHI TIẾT (CLASS TO TYPESCRIPT MAPPING)

| Java Class | Super / Interface | Role & Description | TypeScript Module | Status |
|---|---|---|---|---|
| `a` | ` / ii` | Helper / Subsystem (a) | `@avatar/game-client/core/a.ts` | `ANALYZED` |
| `aa` | ` / ii` | Helper / Subsystem (aa) | `@avatar/game-client/core/aa.ts` | `ANALYZED` |
| `ab` | ` / ii` | Helper / Subsystem (ab) | `@avatar/game-client/core/ab.ts` | `ANALYZED` |
| `ac` | ` / ii` | Helper / Subsystem (ac) | `@avatar/game-client/core/ac.ts` | `ANALYZED` |
| `ad` | `-` | Helper / Subsystem (ad) | `@avatar/game-client/core/ad.ts` | `ANALYZED` |
| `ae` | `hj / cq` | City Map Screen (World Map 26x34) | `@avatar/game-client/maps/CityMapScreen.ts` | `ANALYZED` |
| `af` | `kj / kk` | Subsystem Message Handler (af) | `@avatar/game-client/network/handlers/afHandler.ts` | `ANALYZED` |
| `ag` | `-` | Helper / Subsystem (ag) | `@avatar/game-client/core/ag.ts` | `ANALYZED` |
| `ah` | `-` | Helper / Subsystem (ah) | `@avatar/game-client/core/ah.ts` | `ANALYZED` |
| `ai` | `gx` | Character Subtype (ai extends gx) | `@avatar/game-client/characters/ai.ts` | `ANALYZED` |
| `aj` | ` / ii` | Helper / Subsystem (aj) | `@avatar/game-client/core/aj.ts` | `ANALYZED` |
| `ak` | ` / ii` | Helper / Subsystem (ak) | `@avatar/game-client/core/ak.ts` | `ANALYZED` |
| `al` | `-` | Helper / Subsystem (al) | `@avatar/game-client/core/al.ts` | `ANALYZED` |
| `am` | `by` | Helper / Subsystem (am) | `@avatar/game-client/core/am.ts` | `ANALYZED` |
| `an` | ` / ii` | Helper / Subsystem (an) | `@avatar/game-client/core/an.ts` | `ANALYZED` |
| `ao` | `by` | Helper / Subsystem (ao) | `@avatar/game-client/core/ao.ts` | `ANALYZED` |
| `ap` | `by` | Helper / Subsystem (ap) | `@avatar/game-client/core/ap.ts` | `ANALYZED` |
| `aq` | `by` | Helper / Subsystem (aq) | `@avatar/game-client/core/aq.ts` | `ANALYZED` |
| `ar` | ` / ii` | Helper / Subsystem (ar) | `@avatar/game-client/core/ar.ts` | `ANALYZED` |
| `as` | `by` | Helper / Subsystem (as) | `@avatar/game-client/core/as.ts` | `ANALYZED` |
| `at` | ` / ii` | Helper / Subsystem (at) | `@avatar/game-client/core/at.ts` | `ANALYZED` |
| `au` | ` / Runnable` | Helper / Subsystem (au) | `@avatar/game-client/core/au.ts` | `ANALYZED` |
| `av` | ` / ii` | Helper / Subsystem (av) | `@avatar/game-client/core/av.ts` | `ANALYZED` |
| `aw` | `-` | RMS / Storage & Resource Helper | `@avatar/j2me-compat/io/RecordStoreHelper.ts` | `ANALYZED` |
| `ax` | `-` | Helper / Subsystem (ax) | `@avatar/game-client/core/ax.ts` | `ANALYZED` |
| `ay` | ` / ii` | Helper / Subsystem (ay) | `@avatar/game-client/core/ay.ts` | `ANALYZED` |
| `az` | `-` | Helper / Subsystem (az) | `@avatar/game-client/core/az.ts` | `ANALYZED` |
| `b` | `-` | Helper / Subsystem (b) | `@avatar/game-client/core/b.ts` | `ANALYZED` |
| `ba` | `gz` | Helper / Subsystem (ba) | `@avatar/game-client/core/ba.ts` | `ANALYZED` |
| `bb` | `gy` | Chat Bar / Chat Input Box | `@avatar/game-client/ui/ChatBox.ts` | `ANALYZED` |
| `bc` | `cc` | Helper / Subsystem (bc) | `@avatar/game-client/core/bc.ts` | `ANALYZED` |
| `bd` | `-` | Helper / Subsystem (bd) | `@avatar/game-client/core/bd.ts` | `ANALYZED` |
| `be` | `-` | Helper / Subsystem (be) | `@avatar/game-client/core/be.ts` | `ANALYZED` |
| `bf` | `kj` | Helper / Subsystem (bf) | `@avatar/game-client/core/bf.ts` | `ANALYZED` |
| `bg` | ` / ii` | Helper / Subsystem (bg) | `@avatar/game-client/core/bg.ts` | `ANALYZED` |
| `bh` | ` / ii` | Helper / Subsystem (bh) | `@avatar/game-client/core/bh.ts` | `ANALYZED` |
| `bi` | ` / ii` | Helper / Subsystem (bi) | `@avatar/game-client/core/bi.ts` | `ANALYZED` |
| `bj` | ` / ii` | Helper / Subsystem (bj) | `@avatar/game-client/core/bj.ts` | `ANALYZED` |
| `bk` | `by` | Helper / Subsystem (bk) | `@avatar/game-client/core/bk.ts` | `ANALYZED` |
| `bl` | ` / ii` | Helper / Subsystem (bl) | `@avatar/game-client/core/bl.ts` | `ANALYZED` |
| `bm` | ` / ii` | Helper / Subsystem (bm) | `@avatar/game-client/core/bm.ts` | `ANALYZED` |
| `bn` | `by` | Helper / Subsystem (bn) | `@avatar/game-client/core/bn.ts` | `ANALYZED` |
| `bo` | ` / ii` | Helper / Subsystem (bo) | `@avatar/game-client/core/bo.ts` | `ANALYZED` |
| `bp` | `by` | Helper / Subsystem (bp) | `@avatar/game-client/core/bp.ts` | `ANALYZED` |
| `bq` | ` / ii` | Helper / Subsystem (bq) | `@avatar/game-client/core/bq.ts` | `ANALYZED` |
| `br` | ` / ii` | Helper / Subsystem (br) | `@avatar/game-client/core/br.ts` | `ANALYZED` |
| `bs` | ` / ii` | Helper / Subsystem (bs) | `@avatar/game-client/core/bs.ts` | `ANALYZED` |
| `bt` | ` / ii` | Helper / Subsystem (bt) | `@avatar/game-client/core/bt.ts` | `ANALYZED` |
| `bu` | `by` | Helper / Subsystem (bu) | `@avatar/game-client/core/bu.ts` | `ANALYZED` |
| `bv` | `by` | Helper / Subsystem (bv) | `@avatar/game-client/core/bv.ts` | `ANALYZED` |
| `bw` | ` / ii` | Helper / Subsystem (bw) | `@avatar/game-client/core/bw.ts` | `ANALYZED` |
| `bx` | ` / ii` | Helper / Subsystem (bx) | `@avatar/game-client/core/bx.ts` | `ANALYZED` |
| `by` | `-` | UI Command / SoftKey Action | `@avatar/game-client/ui/CommandAction.ts` | `ANALYZED` |
| `bz` | `by` | Helper / Subsystem (bz) | `@avatar/game-client/core/bz.ts` | `ANALYZED` |
| `c` | `-` | AV Archive Resource Loader (NguyenVanMinh Key) | `@avatar/game-client/assets/AvArchiveLoader.ts` | `ANALYZED` |
| `ca` | `-` | Helper / Subsystem (ca) | `@avatar/game-client/core/ca.ts` | `ANALYZED` |
| `cb` | `-` | Helper / Subsystem (cb) | `@avatar/game-client/core/cb.ts` | `ANALYZED` |
| `cc` | `js` | Entity Subtype (cc extends js) | `@avatar/game-client/entities/cc.ts` | `ANALYZED` |
| `cd` | `hj` | Casino / Card Game Screen | `@avatar/game-client/gameplay/CasinoScreen.ts` | `ANALYZED` |
| `ce` | `kj / cm` | Root Client Message Handler (Global Network Dispatcher) | `@avatar/game-client/network/ClientMessageHandler.ts` | `ANALYZED` |
| `cf` | `cc` | Helper / Subsystem (cf) | `@avatar/game-client/core/cf.ts` | `ANALYZED` |
| `cg` | ` / ii` | Helper / Subsystem (cg) | `@avatar/game-client/core/cg.ts` | `ANALYZED` |
| `ch` | ` / ii` | Helper / Subsystem (ch) | `@avatar/game-client/core/ch.ts` | `ANALYZED` |
| `ci` | ` / ii` | Helper / Subsystem (ci) | `@avatar/game-client/core/ci.ts` | `ANALYZED` |
| `cj` | ` / ii` | Helper / Subsystem (cj) | `@avatar/game-client/core/cj.ts` | `ANALYZED` |
| `ck` | ` / ii` | Helper / Subsystem (ck) | `@avatar/game-client/core/ck.ts` | `ANALYZED` |
| `cl` | ` / ii` | Helper / Subsystem (cl) | `@avatar/game-client/core/cl.ts` | `ANALYZED` |
| `cm` | `-` | Helper / Subsystem (cm) | `@avatar/game-client/core/cm.ts` | `ANALYZED` |
| `cn` | ` / ii` | Helper / Subsystem (cn) | `@avatar/game-client/core/cn.ts` | `ANALYZED` |
| `co` | ` / ii` | Helper / Subsystem (co) | `@avatar/game-client/core/co.ts` | `ANALYZED` |
| `cp` | `-` | Helper / Subsystem (cp) | `@avatar/game-client/core/cp.ts` | `ANALYZED` |
| `cq` | `-` | Helper / Subsystem (cq) | `@avatar/game-client/core/cq.ts` | `ANALYZED` |
| `cr` | ` / ii` | Helper / Subsystem (cr) | `@avatar/game-client/core/cr.ts` | `ANALYZED` |
| `cs` | `-` | Bitmap Font Interface | `@avatar/game-client/renderer/IFont.ts` | `ANALYZED` |
| `ct` | ` / ii` | Helper / Subsystem (ct) | `@avatar/game-client/core/ct.ts` | `ANALYZED` |
| `cu` | ` / ii` | Helper / Subsystem (cu) | `@avatar/game-client/core/cu.ts` | `ANALYZED` |
| `cv` | `-` | Helper / Subsystem (cv) | `@avatar/game-client/core/cv.ts` | `ANALYZED` |
| `cw` | `-` | Helper / Subsystem (cw) | `@avatar/game-client/core/cw.ts` | `ANALYZED` |
| `cx` | `kj` | Helper / Subsystem (cx) | `@avatar/game-client/core/cx.ts` | `ANALYZED` |
| `cy` | `hj` | Screen (cy extends hj) | `@avatar/game-client/ui/screens/cyScreen.ts` | `ANALYZED` |
| `cz` | `hj / cq` | Screen (cz extends hj) | `@avatar/game-client/ui/screens/czScreen.ts` | `ANALYZED` |
| `d` | `by` | Helper / Subsystem (d) | `@avatar/game-client/core/d.ts` | `ANALYZED` |
| `da` | ` / kk` | Subsystem Message Handler (da) | `@avatar/game-client/network/handlers/daHandler.ts` | `ANALYZED` |
| `db` | `-` | Helper / Subsystem (db) | `@avatar/game-client/core/db.ts` | `ANALYZED` |
| `dc` | `-` | Helper / Subsystem (dc) | `@avatar/game-client/core/dc.ts` | `ANALYZED` |
| `dd` | ` / ii` | Helper / Subsystem (dd) | `@avatar/game-client/core/dd.ts` | `ANALYZED` |
| `de` | ` / ii` | Helper / Subsystem (de) | `@avatar/game-client/core/de.ts` | `ANALYZED` |
| `df` | `kj / kk` | Helper / Subsystem (df) | `@avatar/game-client/core/df.ts` | `ANALYZED` |
| `dg` | ` / ii` | Helper / Subsystem (dg) | `@avatar/game-client/core/dg.ts` | `ANALYZED` |
| `dh` | ` / cs` | Bitmap Font Renderer (dh implements cs) | `@avatar/game-client/renderer/BitmapFont.ts` | `ANALYZED` |
| `di` | ` / ii` | Helper / Subsystem (di) | `@avatar/game-client/core/di.ts` | `ANALYZED` |
| `dj` | ` / ii` | Helper / Subsystem (dj) | `@avatar/game-client/core/dj.ts` | `ANALYZED` |
| `dk` | ` / ii` | Helper / Subsystem (dk) | `@avatar/game-client/core/dk.ts` | `ANALYZED` |
| `dl` | `-` | Helper / Subsystem (dl) | `@avatar/game-client/core/dl.ts` | `ANALYZED` |
| `dm` | `hj` | Server Select Screen / Game Config | `@avatar/game-client/gameplay/ServerSelectScreen.ts` | `ANALYZED` |
| `dn` | `js` | Entity Subtype (dn extends js) | `@avatar/game-client/entities/dn.ts` | `ANALYZED` |
| `do` | `-` | Helper / Subsystem (do) | `@avatar/game-client/core/do.ts` | `ANALYZED` |
| `dp` | `hj` | Farm Screen / Farm System | `@avatar/game-client/gameplay/FarmScreen.ts` | `ANALYZED` |
| `dq` | ` / ii` | Helper / Subsystem (dq) | `@avatar/game-client/core/dq.ts` | `ANALYZED` |
| `dr` | `-` | Helper / Subsystem (dr) | `@avatar/game-client/core/dr.ts` | `ANALYZED` |
| `ds` | ` / ii` | Helper / Subsystem (ds) | `@avatar/game-client/core/ds.ts` | `ANALYZED` |
| `dt` | `ai` | Helper / Subsystem (dt) | `@avatar/game-client/core/dt.ts` | `ANALYZED` |
| `du` | ` / ii` | Helper / Subsystem (du) | `@avatar/game-client/core/du.ts` | `ANALYZED` |
| `dv` | ` / ii` | Helper / Subsystem (dv) | `@avatar/game-client/core/dv.ts` | `ANALYZED` |
| `dw` | ` / ii` | Helper / Subsystem (dw) | `@avatar/game-client/core/dw.ts` | `ANALYZED` |
| `dx` | `-` | UI Input TextField | `@avatar/game-client/ui/UITextField.ts` | `ANALYZED` |
| `dy` | ` / Runnable` | Helper / Subsystem (dy) | `@avatar/game-client/core/dy.ts` | `ANALYZED` |
| `dz` | `ai` | Helper / Subsystem (dz) | `@avatar/game-client/core/dz.ts` | `ANALYZED` |
| `e` | `by` | Helper / Subsystem (e) | `@avatar/game-client/core/e.ts` | `ANALYZED` |
| `ea` | `hj` | Screen (ea extends hj) | `@avatar/game-client/ui/screens/eaScreen.ts` | `ANALYZED` |
| `eb` | `kj / kk` | Helper / Subsystem (eb) | `@avatar/game-client/core/eb.ts` | `ANALYZED` |
| `ec` | ` / ii` | Helper / Subsystem (ec) | `@avatar/game-client/core/ec.ts` | `ANALYZED` |
| `ed` | ` / ii` | Helper / Subsystem (ed) | `@avatar/game-client/core/ed.ts` | `ANALYZED` |
| `ee` | ` / ii` | Helper / Subsystem (ee) | `@avatar/game-client/core/ee.ts` | `ANALYZED` |
| `ef` | `-` | Helper / Subsystem (ef) | `@avatar/game-client/core/ef.ts` | `ANALYZED` |
| `eg` | ` / ii` | Helper / Subsystem (eg) | `@avatar/game-client/core/eg.ts` | `ANALYZED` |
| `eh` | ` / ii` | Helper / Subsystem (eh) | `@avatar/game-client/core/eh.ts` | `ANALYZED` |
| `ei` | `hj / cq` | Screen (ei extends hj) | `@avatar/game-client/ui/screens/eiScreen.ts` | `ANALYZED` |
| `ej` | ` / ii` | Helper / Subsystem (ej) | `@avatar/game-client/core/ej.ts` | `ANALYZED` |
| `ek` | `kx` | Helper / Subsystem (ek) | `@avatar/game-client/core/ek.ts` | `ANALYZED` |
| `el` | `hj` | Park / Common Area Screen | `@avatar/game-client/gameplay/ParkScreen.ts` | `ANALYZED` |
| `em` | `by` | Helper / Subsystem (em) | `@avatar/game-client/core/em.ts` | `ANALYZED` |
| `en` | ` / ii` | Helper / Subsystem (en) | `@avatar/game-client/core/en.ts` | `ANALYZED` |
| `eo` | `kj / kk` | Helper / Subsystem (eo) | `@avatar/game-client/core/eo.ts` | `ANALYZED` |
| `ep` | ` / ii` | Helper / Subsystem (ep) | `@avatar/game-client/core/ep.ts` | `ANALYZED` |
| `eq` | ` / ii` | Helper / Subsystem (eq) | `@avatar/game-client/core/eq.ts` | `ANALYZED` |
| `er` | ` / ii` | Helper / Subsystem (er) | `@avatar/game-client/core/er.ts` | `ANALYZED` |
| `es` | `hj` | Login Screen (Chơi mới, Chơi tiếp, Đổi tài khoản) | `@avatar/game-client/gameplay/LoginScreen.ts` | `ANALYZED` |
| `et` | `by` | Helper / Subsystem (et) | `@avatar/game-client/core/et.ts` | `ANALYZED` |
| `eu` | ` / ii` | Helper / Subsystem (eu) | `@avatar/game-client/core/eu.ts` | `ANALYZED` |
| `ev` | `-` | Helper / Subsystem (ev) | `@avatar/game-client/core/ev.ts` | `ANALYZED` |
| `ew` | `-` | UI Painter Interface | `@avatar/game-client/ui/IPainter.ts` | `ANALYZED` |
| `ex` | `is` | Helper / Subsystem (ex) | `@avatar/game-client/core/ex.ts` | `ANALYZED` |
| `ey` | `by` | Helper / Subsystem (ey) | `@avatar/game-client/core/ey.ts` | `ANALYZED` |
| `ez` | `hj` | Character Select / Create Screen | `@avatar/game-client/gameplay/CharSelectScreen.ts` | `ANALYZED` |
| `f` | `-` | Helper / Subsystem (f) | `@avatar/game-client/core/f.ts` | `ANALYZED` |
| `fa` | `ld` | Helper / Subsystem (fa) | `@avatar/game-client/core/fa.ts` | `ANALYZED` |
| `fb` | `by` | Helper / Subsystem (fb) | `@avatar/game-client/core/fb.ts` | `ANALYZED` |
| `fc` | ` / ii` | Helper / Subsystem (fc) | `@avatar/game-client/core/fc.ts` | `ANALYZED` |
| `fd` | `by` | Helper / Subsystem (fd) | `@avatar/game-client/core/fd.ts` | `ANALYZED` |
| `fe` | `by` | Helper / Subsystem (fe) | `@avatar/game-client/core/fe.ts` | `ANALYZED` |
| `ff` | `by` | Helper / Subsystem (ff) | `@avatar/game-client/core/ff.ts` | `ANALYZED` |
| `fg` | ` / ii` | Helper / Subsystem (fg) | `@avatar/game-client/core/fg.ts` | `ANALYZED` |
| `fh` | `-` | Helper / Subsystem (fh) | `@avatar/game-client/core/fh.ts` | `ANALYZED` |
| `fi` | ` / ii` | Helper / Subsystem (fi) | `@avatar/game-client/core/fi.ts` | `ANALYZED` |
| `fj` | `by` | Helper / Subsystem (fj) | `@avatar/game-client/core/fj.ts` | `ANALYZED` |
| `fk` | `by` | Helper / Subsystem (fk) | `@avatar/game-client/core/fk.ts` | `ANALYZED` |
| `fl` | ` / ii` | Helper / Subsystem (fl) | `@avatar/game-client/core/fl.ts` | `ANALYZED` |
| `fm` | `by` | Helper / Subsystem (fm) | `@avatar/game-client/core/fm.ts` | `ANALYZED` |
| `fn` | ` / ii` | Helper / Subsystem (fn) | `@avatar/game-client/core/fn.ts` | `ANALYZED` |
| `fo` | ` / ii` | Helper / Subsystem (fo) | `@avatar/game-client/core/fo.ts` | `ANALYZED` |
| `fp` | ` / ii` | Helper / Subsystem (fp) | `@avatar/game-client/core/fp.ts` | `ANALYZED` |
| `fq` | ` / ii` | Helper / Subsystem (fq) | `@avatar/game-client/core/fq.ts` | `ANALYZED` |
| `fr` | ` / ii` | Helper / Subsystem (fr) | `@avatar/game-client/core/fr.ts` | `ANALYZED` |
| `fs` | ` / CommandListener` | Helper / Subsystem (fs) | `@avatar/game-client/core/fs.ts` | `ANALYZED` |
| `ft` | `jt` | Helper / Subsystem (ft) | `@avatar/game-client/core/ft.ts` | `ANALYZED` |
| `fu` | `by` | Helper / Subsystem (fu) | `@avatar/game-client/core/fu.ts` | `ANALYZED` |
| `fv` | ` / ii` | Helper / Subsystem (fv) | `@avatar/game-client/core/fv.ts` | `ANALYZED` |
| `fw` | ` / ii` | Helper / Subsystem (fw) | `@avatar/game-client/core/fw.ts` | `ANALYZED` |
| `fx` | `-` | Helper / Subsystem (fx) | `@avatar/game-client/core/fx.ts` | `ANALYZED` |
| `fy` | `by` | Helper / Subsystem (fy) | `@avatar/game-client/core/fy.ts` | `ANALYZED` |
| `fz` | `by` | Helper / Subsystem (fz) | `@avatar/game-client/core/fz.ts` | `ANALYZED` |
| `g` | ` / ii` | Helper / Subsystem (g) | `@avatar/game-client/core/g.ts` | `ANALYZED` |
| `ga` | ` / ii` | Helper / Subsystem (ga) | `@avatar/game-client/core/ga.ts` | `ANALYZED` |
| `gb` | `-` | Helper / Subsystem (gb) | `@avatar/game-client/core/gb.ts` | `ANALYZED` |
| `gc` | ` / ii` | Helper / Subsystem (gc) | `@avatar/game-client/core/gc.ts` | `ANALYZED` |
| `gd` | ` / ii` | Helper / Subsystem (gd) | `@avatar/game-client/core/gd.ts` | `ANALYZED` |
| `ge` | ` / ii` | Helper / Subsystem (ge) | `@avatar/game-client/core/ge.ts` | `ANALYZED` |
| `gf` | ` / ii` | Helper / Subsystem (gf) | `@avatar/game-client/core/gf.ts` | `ANALYZED` |
| `gg` | ` / ii` | Helper / Subsystem (gg) | `@avatar/game-client/core/gg.ts` | `ANALYZED` |
| `gh` | ` / ii` | Helper / Subsystem (gh) | `@avatar/game-client/core/gh.ts` | `ANALYZED` |
| `gi` | ` / ii` | Helper / Subsystem (gi) | `@avatar/game-client/core/gi.ts` | `ANALYZED` |
| `gj` | ` / ii` | Helper / Subsystem (gj) | `@avatar/game-client/core/gj.ts` | `ANALYZED` |
| `gk` | `by` | Helper / Subsystem (gk) | `@avatar/game-client/core/gk.ts` | `ANALYZED` |
| `gl` | `by` | Helper / Subsystem (gl) | `@avatar/game-client/core/gl.ts` | `ANALYZED` |
| `gm` | ` / ii` | Helper / Subsystem (gm) | `@avatar/game-client/core/gm.ts` | `ANALYZED` |
| `gn` | `kj / kk` | Subsystem Message Handler (gn) | `@avatar/game-client/network/handlers/gnHandler.ts` | `ANALYZED` |
| `go` | `hj` | Screen (go extends hj) | `@avatar/game-client/ui/screens/goScreen.ts` | `ANALYZED` |
| `gp` | `kr` | Helper / Subsystem (gp) | `@avatar/game-client/core/gp.ts` | `ANALYZED` |
| `gq` | `gs` | Helper / Subsystem (gq) | `@avatar/game-client/core/gq.ts` | `ANALYZED` |
| `gr` | `ai` | Helper / Subsystem (gr) | `@avatar/game-client/core/gr.ts` | `ANALYZED` |
| `gs` | `gy` | UI Component (gs extends gy) | `@avatar/game-client/ui/components/gs.ts` | `ANALYZED` |
| `gt` | ` / ii` | Helper / Subsystem (gt) | `@avatar/game-client/core/gt.ts` | `ANALYZED` |
| `gu` | `-` | Helper / Subsystem (gu) | `@avatar/game-client/core/gu.ts` | `ANALYZED` |
| `gv` | ` / Runnable` | Message Collector Thread / Packet Receiver | `@avatar/protocol/decoder/MessageCollector.ts` | `ANALYZED` |
| `gw` | ` / ew` | UI Skin Painter (gw implements ew) | `@avatar/game-client/ui/UISkinPainter.ts` | `ANALYZED` |
| `gx` | `js` | Character / Avatar Base | `@avatar/game-client/characters/Avatar.ts` | `ANALYZED` |
| `gy` | `-` | Base UI Element / Softkey Container | `@avatar/game-client/ui/UIElement.ts` | `ANALYZED` |
| `gz` | `-` | Helper / Subsystem (gz) | `@avatar/game-client/core/gz.ts` | `ANALYZED` |
| `h` | `by` | Helper / Subsystem (h) | `@avatar/game-client/core/h.ts` | `ANALYZED` |
| `ha` | `gy` | Dialog / Alert Window (MessageBox) | `@avatar/game-client/ui/DialogWindow.ts` | `ANALYZED` |
| `hb` | `gs` | Helper / Subsystem (hb) | `@avatar/game-client/core/hb.ts` | `ANALYZED` |
| `hc` | `hj` | Screen (hc extends hj) | `@avatar/game-client/ui/screens/hcScreen.ts` | `ANALYZED` |
| `hd` | `-` | Helper / Subsystem (hd) | `@avatar/game-client/core/hd.ts` | `ANALYZED` |
| `he` | `-` | Helper / Subsystem (he) | `@avatar/game-client/core/he.ts` | `ANALYZED` |
| `hf` | `-` | Helper / Subsystem (hf) | `@avatar/game-client/core/hf.ts` | `ANALYZED` |
| `hg` | `by` | Helper / Subsystem (hg) | `@avatar/game-client/core/hg.ts` | `ANALYZED` |
| `hh` | ` / ii` | Helper / Subsystem (hh) | `@avatar/game-client/core/hh.ts` | `ANALYZED` |
| `hi` | `ha` | Helper / Subsystem (hi) | `@avatar/game-client/core/hi.ts` | `ANALYZED` |
| `hj` | `gy` | Base GameScreen / LCDUI Screen Container | `@avatar/game-client/ui/GameScreen.ts` | `ANALYZED` |
| `hk` | `hj` | Screen (hk extends hj) | `@avatar/game-client/ui/screens/hkScreen.ts` | `ANALYZED` |
| `hl` | `gx` | Other Player (Remote Avatar) | `@avatar/game-client/characters/RemotePlayer.ts` | `ANALYZED` |
| `hm` | `gx` | Pet / Animal Entity | `@avatar/game-client/entities/PetEntity.ts` | `ANALYZED` |
| `hn` | `gx` | Main Player (Local User Avatar) | `@avatar/game-client/characters/MainPlayer.ts` | `ANALYZED` |
| `ho` | `-` | Helper / Subsystem (ho) | `@avatar/game-client/core/ho.ts` | `ANALYZED` |
| `hp` | ` / ii` | Helper / Subsystem (hp) | `@avatar/game-client/core/hp.ts` | `ANALYZED` |
| `hq` | `-` | Helper / Subsystem (hq) | `@avatar/game-client/core/hq.ts` | `ANALYZED` |
| `hr` | ` / ii` | Helper / Subsystem (hr) | `@avatar/game-client/core/hr.ts` | `ANALYZED` |
| `hs` | ` / ii` | Helper / Subsystem (hs) | `@avatar/game-client/core/hs.ts` | `ANALYZED` |
| `ht` | `-` | FrameImage / SpriteSheet (ht) | `@avatar/game-client/renderer/FrameImage.ts` | `ANALYZED` |
| `hu` | ` / ii` | Helper / Subsystem (hu) | `@avatar/game-client/core/hu.ts` | `ANALYZED` |
| `hv` | ` / ii` | Helper / Subsystem (hv) | `@avatar/game-client/core/hv.ts` | `ANALYZED` |
| `hw` | `hj` | Screen (hw extends hj) | `@avatar/game-client/ui/screens/hwScreen.ts` | `ANALYZED` |
| `hx` | `-` | Helper / Subsystem (hx) | `@avatar/game-client/core/hx.ts` | `ANALYZED` |
| `hy` | `gs` | Helper / Subsystem (hy) | `@avatar/game-client/core/hy.ts` | `ANALYZED` |
| `hz` | `cc` | Helper / Subsystem (hz) | `@avatar/game-client/core/hz.ts` | `ANALYZED` |
| `i` | `by` | Helper / Subsystem (i) | `@avatar/game-client/core/i.ts` | `ANALYZED` |
| `ia` | ` / ii` | Helper / Subsystem (ia) | `@avatar/game-client/core/ia.ts` | `ANALYZED` |
| `ib` | ` / ii` | Helper / Subsystem (ib) | `@avatar/game-client/core/ib.ts` | `ANALYZED` |
| `ic` | `hj` | Screen (ic extends hj) | `@avatar/game-client/ui/screens/icScreen.ts` | `ANALYZED` |
| `id` | `by` | Helper / Subsystem (id) | `@avatar/game-client/core/id.ts` | `ANALYZED` |
| `ie` | `kj` | Helper / Subsystem (ie) | `@avatar/game-client/core/ie.ts` | `ANALYZED` |
| `if` | `gs` | Helper / Subsystem (if) | `@avatar/game-client/core/if.ts` | `ANALYZED` |
| `ig` | ` / ii` | Helper / Subsystem (ig) | `@avatar/game-client/core/ig.ts` | `ANALYZED` |
| `ih` | ` / ii` | Helper / Subsystem (ih) | `@avatar/game-client/core/ih.ts` | `ANALYZED` |
| `ii` | `-` | Helper / Subsystem (ii) | `@avatar/game-client/core/ii.ts` | `ANALYZED` |
| `ij` | ` / ii` | Helper / Subsystem (ij) | `@avatar/game-client/core/ij.ts` | `ANALYZED` |
| `ik` | ` / ii` | Helper / Subsystem (ik) | `@avatar/game-client/core/ik.ts` | `ANALYZED` |
| `il` | `-` | Helper / Subsystem (il) | `@avatar/game-client/core/il.ts` | `ANALYZED` |
| `im` | `gy` | UI Component (im extends gy) | `@avatar/game-client/ui/components/im.ts` | `ANALYZED` |
| `in` | ` / ii` | Helper / Subsystem (in) | `@avatar/game-client/core/in.ts` | `ANALYZED` |
| `io` | ` / ii` | Helper / Subsystem (io) | `@avatar/game-client/core/io.ts` | `ANALYZED` |
| `ip` | `is` | Helper / Subsystem (ip) | `@avatar/game-client/core/ip.ts` | `ANALYZED` |
| `iq` | ` / ii` | Helper / Subsystem (iq) | `@avatar/game-client/core/iq.ts` | `ANALYZED` |
| `ir` | `-` | Map / Tilemap Engine / Room Manager | `@avatar/game-client/maps/MapEngine.ts` | `ANALYZED` |
| `is` | `ai` | Helper / Subsystem (is) | `@avatar/game-client/core/is.ts` | `ANALYZED` |
| `it` | `kj` | Helper / Subsystem (it) | `@avatar/game-client/core/it.ts` | `ANALYZED` |
| `iu` | ` / ii` | Helper / Subsystem (iu) | `@avatar/game-client/core/iu.ts` | `ANALYZED` |
| `iv` | `by` | Helper / Subsystem (iv) | `@avatar/game-client/core/iv.ts` | `ANALYZED` |
| `iw` | `ld` | Helper / Subsystem (iw) | `@avatar/game-client/core/iw.ts` | `ANALYZED` |
| `ix` | `by` | Helper / Subsystem (ix) | `@avatar/game-client/core/ix.ts` | `ANALYZED` |
| `iy` | `kj` | Helper / Subsystem (iy) | `@avatar/game-client/core/iy.ts` | `ANALYZED` |
| `iz` | `by` | Helper / Subsystem (iz) | `@avatar/game-client/core/iz.ts` | `ANALYZED` |
| `j` | `by` | Helper / Subsystem (j) | `@avatar/game-client/core/j.ts` | `ANALYZED` |
| `ja` | `kx` | Helper / Subsystem (ja) | `@avatar/game-client/core/ja.ts` | `ANALYZED` |
| `jb` | `ha` | Helper / Subsystem (jb) | `@avatar/game-client/core/jb.ts` | `ANALYZED` |
| `jc` | ` / ii` | Helper / Subsystem (jc) | `@avatar/game-client/core/jc.ts` | `ANALYZED` |
| `jd` | `hj` | Screen (jd extends hj) | `@avatar/game-client/ui/screens/jdScreen.ts` | `ANALYZED` |
| `je` | `-` | Helper / Subsystem (je) | `@avatar/game-client/core/je.ts` | `ANALYZED` |
| `jf` | `-` | Helper / Subsystem (jf) | `@avatar/game-client/core/jf.ts` | `ANALYZED` |
| `jg` | `by` | Helper / Subsystem (jg) | `@avatar/game-client/core/jg.ts` | `ANALYZED` |
| `jh` | `-` | Helper / Subsystem (jh) | `@avatar/game-client/core/jh.ts` | `ANALYZED` |
| `ji` | `by` | Helper / Subsystem (ji) | `@avatar/game-client/core/ji.ts` | `ANALYZED` |
| `jj` | `gs` | Helper / Subsystem (jj) | `@avatar/game-client/core/jj.ts` | `ANALYZED` |
| `jk` | ` / ii` | Helper / Subsystem (jk) | `@avatar/game-client/core/jk.ts` | `ANALYZED` |
| `jl` | `by` | Helper / Subsystem (jl) | `@avatar/game-client/core/jl.ts` | `ANALYZED` |
| `jm` | ` / ii` | Helper / Subsystem (jm) | `@avatar/game-client/core/jm.ts` | `ANALYZED` |
| `jn` | `-` | Helper / Subsystem (jn) | `@avatar/game-client/core/jn.ts` | `ANALYZED` |
| `jo` | `gx` | NPC Entity | `@avatar/game-client/entities/NpcEntity.ts` | `ANALYZED` |
| `jp` | `hj` | Race / Minigame Screen | `@avatar/game-client/gameplay/MinigameScreen.ts` | `ANALYZED` |
| `jq` | `by` | Helper / Subsystem (jq) | `@avatar/game-client/core/jq.ts` | `ANALYZED` |
| `jr` | `-` | Network Message (Packet) | `@avatar/protocol/packet/Message.ts` | `ANALYZED` |
| `js` | `-` | Base Entity / Actor | `@avatar/game-client/entities/Entity.ts` | `ANALYZED` |
| `jt` | `-` | Helper / Subsystem (jt) | `@avatar/game-client/core/jt.ts` | `ANALYZED` |
| `ju` | `-` | Helper / Subsystem (ju) | `@avatar/game-client/core/ju.ts` | `ANALYZED` |
| `jv` | `hj` | Splash / Logo Screen (TeaMobi) | `@avatar/game-client/ui/SplashScreen.ts` | `ANALYZED` |
| `jw` | ` / ii` | Helper / Subsystem (jw) | `@avatar/game-client/core/jw.ts` | `ANALYZED` |
| `jx` | `by` | Helper / Subsystem (jx) | `@avatar/game-client/core/jx.ts` | `ANALYZED` |
| `jy` | `hj` | Screen (jy extends hj) | `@avatar/game-client/ui/screens/jyScreen.ts` | `ANALYZED` |
| `jz` | ` / kk` | Subsystem Message Handler (jz) | `@avatar/game-client/network/handlers/jzHandler.ts` | `ANALYZED` |
| `k` | ` / ii` | Helper / Subsystem (k) | `@avatar/game-client/core/k.ts` | `ANALYZED` |
| `ka` | ` / ii` | Helper / Subsystem (ka) | `@avatar/game-client/core/ka.ts` | `ANALYZED` |
| `kb` | `-` | Helper / Subsystem (kb) | `@avatar/game-client/core/kb.ts` | `ANALYZED` |
| `kc` | `cc` | Helper / Subsystem (kc) | `@avatar/game-client/core/kc.ts` | `ANALYZED` |
| `kd` | `kx` | Helper / Subsystem (kd) | `@avatar/game-client/core/kd.ts` | `ANALYZED` |
| `ke` | `-` | Helper / Subsystem (ke) | `@avatar/game-client/core/ke.ts` | `ANALYZED` |
| `kf` | `-` | Game Strings & Language Constants | `@avatar/game-client/core/GameStrings.ts` | `ANALYZED` |
| `kg` | `kx` | Helper / Subsystem (kg) | `@avatar/game-client/core/kg.ts` | `ANALYZED` |
| `kh` | ` / Runnable` | Helper / Subsystem (kh) | `@avatar/game-client/core/kh.ts` | `ANALYZED` |
| `ki` | `ha` | Helper / Subsystem (ki) | `@avatar/game-client/core/ki.ts` | `ANALYZED` |
| `kj` | `-` | Helper / Subsystem (kj) | `@avatar/game-client/core/kj.ts` | `ANALYZED` |
| `kk` | `-` | Helper / Subsystem (kk) | `@avatar/game-client/core/kk.ts` | `ANALYZED` |
| `kl` | `-` | Helper / Subsystem (kl) | `@avatar/game-client/core/kl.ts` | `ANALYZED` |
| `km` | `-` | Helper / Subsystem (km) | `@avatar/game-client/core/km.ts` | `ANALYZED` |
| `kn` | `kj / kk` | Helper / Subsystem (kn) | `@avatar/game-client/core/kn.ts` | `ANALYZED` |
| `ko` | `by` | Helper / Subsystem (ko) | `@avatar/game-client/core/ko.ts` | `ANALYZED` |
| `kp` | `-` | Helper / Subsystem (kp) | `@avatar/game-client/core/kp.ts` | `ANALYZED` |
| `kq` | `cc` | Helper / Subsystem (kq) | `@avatar/game-client/core/kq.ts` | `ANALYZED` |
| `kr` | `gy` | UI Component (kr extends gy) | `@avatar/game-client/ui/components/kr.ts` | `ANALYZED` |
| `ks` | `cc` | Helper / Subsystem (ks) | `@avatar/game-client/core/ks.ts` | `ANALYZED` |
| `kt` | ` / hq` | TCP Session / Connection Manager | `@avatar/protocol/session/NetworkSession.ts` | `ANALYZED` |
| `ku` | ` / ii` | Helper / Subsystem (ku) | `@avatar/game-client/core/ku.ts` | `ANALYZED` |
| `kv` | `hj` | Screen (kv extends hj) | `@avatar/game-client/ui/screens/kvScreen.ts` | `ANALYZED` |
| `kw` | ` / ii` | Helper / Subsystem (kw) | `@avatar/game-client/core/kw.ts` | `ANALYZED` |
| `kx` | `hj / cq` | Screen (kx extends hj) | `@avatar/game-client/ui/screens/kxScreen.ts` | `ANALYZED` |
| `ky` | `-` | Helper / Subsystem (ky) | `@avatar/game-client/core/ky.ts` | `ANALYZED` |
| `kz` | `kj / kk` | Helper / Subsystem (kz) | `@avatar/game-client/core/kz.ts` | `ANALYZED` |
| `l` | ` / ii` | Helper / Subsystem (l) | `@avatar/game-client/core/l.ts` | `ANALYZED` |
| `la` | `hj` | Screen (la extends hj) | `@avatar/game-client/ui/screens/laScreen.ts` | `ANALYZED` |
| `lb` | `ld` | Helper / Subsystem (lb) | `@avatar/game-client/core/lb.ts` | `ANALYZED` |
| `lc` | `-` | Helper / Subsystem (lc) | `@avatar/game-client/core/lc.ts` | `ANALYZED` |
| `ld` | `-` | Helper / Subsystem (ld) | `@avatar/game-client/core/ld.ts` | `ANALYZED` |
| `le` | `kr` | Popup Menu / Option Menu | `@avatar/game-client/ui/PopupMenu.ts` | `ANALYZED` |
| `lf` | `kj / kk` | Subsystem Message Handler (lf) | `@avatar/game-client/network/handlers/lfHandler.ts` | `ANALYZED` |
| `m` | ` / ii` | Helper / Subsystem (m) | `@avatar/game-client/core/m.ts` | `ANALYZED` |
| `main.GameMidlet` | `MIDlet` | MIDlet Entry Point | `@avatar/game-client/core/GameMidlet.ts` | `ANALYZED` |
| `main.a` | `Canvas / Runnable,CommandListener` | GameCanvas / Main Loop / Input / Render Dispatcher | `@avatar/game-client/runtime/GameCanvas.ts` | `ANALYZED` |
| `main.b` | ` / Runnable` | Midlet Helper Thread | `@avatar/game-client/core/MidletHelper.ts` | `ANALYZED` |
| `n` | ` / ii` | Helper / Subsystem (n) | `@avatar/game-client/core/n.ts` | `ANALYZED` |
| `o` | ` / ii` | Helper / Subsystem (o) | `@avatar/game-client/core/o.ts` | `ANALYZED` |
| `p` | ` / ii` | Helper / Subsystem (p) | `@avatar/game-client/core/p.ts` | `ANALYZED` |
| `q` | `-` | Helper / Subsystem (q) | `@avatar/game-client/core/q.ts` | `ANALYZED` |
| `r` | ` / ii` | Helper / Subsystem (r) | `@avatar/game-client/core/r.ts` | `ANALYZED` |
| `s` | ` / ii` | Helper / Subsystem (s) | `@avatar/game-client/core/s.ts` | `ANALYZED` |
| `t` | `by` | Helper / Subsystem (t) | `@avatar/game-client/core/t.ts` | `ANALYZED` |
| `u` | ` / ii` | Helper / Subsystem (u) | `@avatar/game-client/core/u.ts` | `ANALYZED` |
| `v` | `-` | Helper / Subsystem (v) | `@avatar/game-client/core/v.ts` | `ANALYZED` |
| `w` | ` / ii` | Helper / Subsystem (w) | `@avatar/game-client/core/w.ts` | `ANALYZED` |
| `x` | ` / ii` | Helper / Subsystem (x) | `@avatar/game-client/core/x.ts` | `ANALYZED` |
| `y` | `by` | Helper / Subsystem (y) | `@avatar/game-client/core/y.ts` | `ANALYZED` |
| `z` | ` / ii` | Helper / Subsystem (z) | `@avatar/game-client/core/z.ts` | `ANALYZED` |

## 3. CÁC MODULE CỐT LÕI (CORE ARCHITECTURE BREAKDOWN)

### 3.1 Bootstrap & Lifecycle
- `main.GameMidlet`: Entry point. Khởi tạo `Display`, đọc `provider.txt` và `agent.txt`, khởi tạo `GameCanvas` (`main.a`), font, và thiết lập `ce` làm message handler.
- `main.a`: `GameCanvas` thực thi `Runnable` (Game Loop 20 FPS, sleep 50ms), điều phối `paint(Graphics)` theo 11 layers, bắt sự kiện phím số, d-pad và con trỏ.

### 3.2 J2ME Compatibility Layer (`packages/j2me-compat`)
- `javax.microedition.lcdui.Graphics`: WebGL Canvas 2D/Shader pipeline hỗ trợ `drawRegion`, `drawImage`, `setClip`, `translate`, `setColor`, `fillRect`, `drawRoundRect`, `drawSubstring`.
- `javax.microedition.lcdui.Image`: WebGL Texture wrapper hỗ trợ tạo từ byte array PNG.
- `javax.microedition.lcdui.game.Sprite`: Transform constants (NONE=0, MIRROR=2, ROT90=5, ROT180=3, ROT270=6, MIRROR_ROT90=7, MIRROR_ROT180=1, MIRROR_ROT270=4).
- `javax.microedition.rms.RecordStore`: LocalStorage / IndexedDB persistence layer tương thích RMS.

### 3.3 Network Protocol (`packages/protocol`)
- `kt`: Network Client Socket.
- `jr`: Message Packet (DataInputStream/DataOutputStream).
- `gv`: MessageCollector (Receiver Thread).
- `ce`: Root Client MessageHandler.
- Key Exchange: Packet `-27` truyền byte array key. Giải mã XOR liên tiếp: `key[i] = key[i-1] ^ data[i]`. Mã hóa đối xứng luân phiên `curR` và `curW`.

### 3.4 Asset & Resource Decoder (`packages/game-client/assets`)
- `c.java`: Giải mã container `.av` với khóa bí mật `NguyenVanMinh` (13 bytes XOR).
- `dh.java`: Hệ thống Bitmap Font (normal, border, arial, black, number, smallRed, smallYellow, big).
- `ht.java`: SpriteSheet / FrameImage (`drawRegion` theo khung hình).

### 3.5 Game World, Maps & Entities
- `ir.java`: Map Engine, quản lý Room, tileset, lớp đối tượng, va chạm.
- `ae.java`: City Map 26x34 grid matrix.
- `gx.java`, `hn.java`, `hl.java`, `jo.java`, `hm.java`: Avatar render & logic, animation parts 15 frames.