# Copyright-Free Ambient Sound Sources

## Audio Files untuk LofiMini

Unduh file-file berikut dan simpan di folder `public/sounds/` dengan nama yang sesuai:

### 1. Rain (rain.mp3)
**Source:** Pixabay / Freesound
**Recommendations:**
- https://pixabay.com/sound-effects/rain-and-thunder-16705/
- https://freesound.org/people/InspectorJ/sounds/411490/ (Rain on Concrete)
- https://freesound.org/people/klankbeeld/sounds/198302/ (Heavy Rain)

### 2. Thunder (thunder.mp3)
**Source:** Pixabay / Freesound
**Recommendations:**
- https://pixabay.com/sound-effects/thunder-25689/
- https://freesound.org/people/Benboncan/sounds/73581/ (Distant Thunder)
- https://freesound.org/people/CGEffex/sounds/93134/ (Thunder)

### 3. Cafe (cafe.mp3)
**Source:** Freesound / BBC Sound Effects
**Recommendations:**
- https://freesound.org/people/stephan/sounds/398228/ (Coffee Shop Ambience)
- https://freesound.org/people/EBranda/sounds/594960/ (Cafe Ambience)
- https://freesound.org/people/Leandros/sounds/179390/ (Restaurant Ambience)

### 4. Fireplace (fireplace.mp3)
**Source:** Pixabay / Freesound
**Recommendations:**
- https://pixabay.com/sound-effects/fireplace-85534/
- https://freesound.org/people/InspectorJ/sounds/376415/ (Fire Crackling)
- https://freesound.org/people/juskiddink/sounds/140281/ (Fireplace)

### 5. Ocean (ocean.mp3)
**Source:** Pixabay / Freesound
**Recommendations:**
- https://pixabay.com/sound-effects/ocean-waves-112906/
- https://freesound.org/people/c97059890/sounds/21754/ (Ocean Waves)
- https://freesound.org/people/Luftrum/sounds/48412/ (Seaside Ambience)

### 6. Forest (forest.mp3)
**Source:** Freesound / BBC
**Recommendations:**
- https://freesound.org/people/nicktermer/sounds/448387/ (Forest Birds)
- https://freesound.org/people/kvgarlic/sounds/156143/ (Forest Ambience)
- https://freesound.org/people/Benboncan/sounds/64700/ (Forest Dawn)

### 7. Keyboard (keyboard.mp3)
**Source:** Freesound / Mixkit
**Recommendations:**
- https://freesound.org/people/Proxima4/sounds/104339/ (Mechanical Keyboard)
- https://freesound.org/people/ZeSoundResearchRep/sounds/158868/ (Keyboard Typing)
- https://assets.mixkit.co/sfx/preview/mixkit-keyboard-typing-1386.mp3

---

## Cara Download dari Freesound.org

1. Kunjungi link Freesound
2. Klik tombol "Download" (tidak perlu login untuk kebanyakan sounds)
3. Pilih format MP3 atau OGG
4. Simpan file dengan nama sesuai (rain.mp3, thunder.mp3, dll)
5. Pindahkan ke folder `public/sounds/`

---

## Cara Download dari Pixabay

1. Kunjungi link Pixabay Sound Effects
2. Klik tombol "Free Download"
3. Pilih "Original" quality
4. Rename file sesuai ambient type
5. Pindahkan ke folder `public/sounds/`

---

## Alternatif: Gunakan URL Langsung (Streaming)

Jika tidak ingin download, Anda bisa gunakan URL langsung dari sources seperti:

```javascript
// Example URLs (pastikan cek license)
const SOUND_URLS = {
  rain: 'https://cdn.pixabay.com/audio/...',
  thunder: 'https://cdn.pixabay.com/audio/...',
  // dst...
}
```

---

## License Information

Semua sumber di atas menggunakan:
- **CC0** (Public Domain) - Bebas digunakan tanpa atribusi
- **CC BY** - Gratis dengan atribusi creator
- **Pixabay License** - Gratis untuk penggunaan komersial dan non-komersial

Selalu cek individual license pada setiap file yang di-download!

---

**Folder Structure setelah download:**
```
public/
└── sounds/
    ├── rain.mp3
    ├── thunder.mp3
    ├── cafe.mp3
    ├── fireplace.mp3
    ├── ocean.mp3
    ├── forest.mp3
    └── keyboard.mp3
```
