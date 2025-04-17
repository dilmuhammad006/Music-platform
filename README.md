# Musiqa tingliash imkoniyatini beruvchi loyiha!

## Funksional talablar:
- User Register qilishi.
- User Login qilishi.
- Tokenga ega bo'lishi.
- User musiqa tinglasy olishi.
- Biror bir musiqani yoqtirilganlarga qo'shish.
- Musiqalarni ijrochisi bo'yicha qidirishi.
- Musiqalarni nomi bo'yicha qidirishi.
- Biror bir ijrochining ket-ma ket musiqalarini tinglay olishi.

## No funksional talablar:
- Musiqalar doim kengaytirib borilishi.
- Refresh token orqali acces token vaqtini uzaytirish va tizimda barqaror ushlash.
- Tezlik.
- Havfsizlik.


## Malumotlar:

1. User:
    - id
    - name
    - email (Unique)
    - password


2.  Musician
    - id
    - name
    - nickname (Unique)
    - musics (FK)
    - musicsCount
    - createdAt
    - imageUrl

3. Music:
    - id
    - name
    - musicianId (FK)
    - createdAt
    - duration

4. LikedMusic:
    - id
    - userId(FK)
    - musicId (FK)
    - musicianId (FK)
    - createdAt
