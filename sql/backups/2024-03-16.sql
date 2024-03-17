PGDMP                      |           ybqbejar     13.9 (Ubuntu 13.9-1.pgdg20.04+1)    16.2 S    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    8718835    ybqbejar    DATABASE     t   CREATE DATABASE ybqbejar WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE ybqbejar;
                ybqbejar    false            3           0    0    DATABASE ybqbejar    ACL     ;   REVOKE CONNECT,TEMPORARY ON DATABASE ybqbejar FROM PUBLIC;
                   ybqbejar    false    4146                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            4           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    25                        3079    17161 	   btree_gin 	   EXTENSION     =   CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;
    DROP EXTENSION btree_gin;
                   false    25            5           0    0    EXTENSION btree_gin    COMMENT     R   COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';
                        false    15                        3079    17702 
   btree_gist 	   EXTENSION     >   CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;
    DROP EXTENSION btree_gist;
                   false    25            6           0    0    EXTENSION btree_gist    COMMENT     T   COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';
                        false    19                        3079    16671    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                   false    25            7           0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                        false    8                        3079    17599    cube 	   EXTENSION     8   CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;
    DROP EXTENSION cube;
                   false    25            8           0    0    EXTENSION cube    COMMENT     E   COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';
                        false    17                        3079    16384    dblink 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;
    DROP EXTENSION dblink;
                   false    25            9           0    0    EXTENSION dblink    COMMENT     _   COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';
                        false    2                        3079    17152    dict_int 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;
    DROP EXTENSION dict_int;
                   false    25            :           0    0    EXTENSION dict_int    COMMENT     Q   COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';
                        false    14                        3079    18325 	   dict_xsyn 	   EXTENSION     =   CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;
    DROP EXTENSION dict_xsyn;
                   false    25            ;           0    0    EXTENSION dict_xsyn    COMMENT     e   COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';
                        false    20                        3079    17686    earthdistance 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;
    DROP EXTENSION earthdistance;
                   false    25    17            <           0    0    EXTENSION earthdistance    COMMENT     f   COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';
                        false    18                        3079    16660    fuzzystrmatch 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;
    DROP EXTENSION fuzzystrmatch;
                   false    25            =           0    0    EXTENSION fuzzystrmatch    COMMENT     ]   COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';
                        false    7                        3079    17025    hstore 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;
    DROP EXTENSION hstore;
                   false    25            >           0    0    EXTENSION hstore    COMMENT     S   COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';
                        false    13                        3079    16903    intarray 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;
    DROP EXTENSION intarray;
                   false    25            ?           0    0    EXTENSION intarray    COMMENT     g   COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';
                        false    12                        3079    16444    ltree 	   EXTENSION     9   CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;
    DROP EXTENSION ltree;
                   false    25            @           0    0    EXTENSION ltree    COMMENT     Q   COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';
                        false    4                        3079    18337    pg_stat_statements 	   EXTENSION     F   CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;
 #   DROP EXTENSION pg_stat_statements;
                   false    25            A           0    0    EXTENSION pg_stat_statements    COMMENT     u   COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';
                        false    22                        3079    16824    pg_trgm 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;
    DROP EXTENSION pg_trgm;
                   false    25            B           0    0    EXTENSION pg_trgm    COMMENT     e   COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';
                        false    11            
            3079    16787    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false    25            C           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    10                        3079    17597 
   pgrowlocks 	   EXTENSION     >   CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;
    DROP EXTENSION pgrowlocks;
                   false    25            D           0    0    EXTENSION pgrowlocks    COMMENT     I   COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';
                        false    16                        3079    16629    pgstattuple 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;
    DROP EXTENSION pgstattuple;
                   false    25            E           0    0    EXTENSION pgstattuple    COMMENT     C   COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';
                        false    5                        3079    16639 	   tablefunc 	   EXTENSION     =   CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;
    DROP EXTENSION tablefunc;
                   false    25            F           0    0    EXTENSION tablefunc    COMMENT     `   COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';
                        false    6                        3079    18330    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false    25            G           0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    21            	            3079    16776 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    25            H           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    9                        3079    16430    xml2 	   EXTENSION     8   CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;
    DROP EXTENSION xml2;
                   false    25            I           0    0    EXTENSION xml2    COMMENT     8   COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';
                        false    3            �            1259    10251735    activity_types    TABLE     �   CREATE TABLE public.activity_types (
    id integer NOT NULL,
    activity_id smallint NOT NULL,
    activity_text character varying NOT NULL
);
 "   DROP TABLE public.activity_types;
       public         heap    ybqbejar    false    25            �            1259    10251733    activity_types_id_seq    SEQUENCE     �   CREATE SEQUENCE public.activity_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.activity_types_id_seq;
       public          ybqbejar    false    25    231            J           0    0    activity_types_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.activity_types_id_seq OWNED BY public.activity_types.id;
          public          ybqbejar    false    230            �            1259    13777693    archive_entries    TABLE     �  CREATE TABLE public.archive_entries (
    id integer NOT NULL,
    auth_id character varying,
    activity_type smallint NOT NULL,
    activity_date date DEFAULT CURRENT_DATE NOT NULL,
    activity_duration integer NOT NULL,
    date_created date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT archive_entries_activity_duration_check CHECK ((activity_duration >= 0)),
    CONSTRAINT archive_entries_activity_type_check CHECK ((activity_type >= 0))
);
 #   DROP TABLE public.archive_entries;
       public         heap    ybqbejar    false    25            �            1259    13777691    archive_entries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.archive_entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.archive_entries_id_seq;
       public          ybqbejar    false    25    233            K           0    0    archive_entries_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.archive_entries_id_seq OWNED BY public.archive_entries.id;
          public          ybqbejar    false    232            �            1259    8720333    entries    TABLE     �  CREATE TABLE public.entries (
    id integer NOT NULL,
    auth_id character varying,
    activity_type smallint NOT NULL,
    activity_date date DEFAULT CURRENT_DATE NOT NULL,
    activity_duration integer NOT NULL,
    date_created date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT entries_activity_duration_check CHECK ((activity_duration >= 0)),
    CONSTRAINT entries_activity_type_check CHECK ((activity_type >= 0))
);
    DROP TABLE public.entries;
       public         heap    ybqbejar    false    25            �            1259    8720343    entries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.entries_id_seq;
       public          ybqbejar    false    25    226            L           0    0    entries_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;
          public          ybqbejar    false    227            �            1259    8720345    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    auth_id character varying NOT NULL,
    permission_level smallint NOT NULL,
    email character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    graduation_year smallint DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    CONSTRAINT users_permission_level_check CHECK ((permission_level >= 0))
);
    DROP TABLE public.users;
       public         heap    ybqbejar    false    25            �            1259    8720353    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          ybqbejar    false    25    228            M           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          ybqbejar    false    229            �           2604    10251738    activity_types id    DEFAULT     v   ALTER TABLE ONLY public.activity_types ALTER COLUMN id SET DEFAULT nextval('public.activity_types_id_seq'::regclass);
 @   ALTER TABLE public.activity_types ALTER COLUMN id DROP DEFAULT;
       public          ybqbejar    false    231    230    231            �           2604    13777696    archive_entries id    DEFAULT     x   ALTER TABLE ONLY public.archive_entries ALTER COLUMN id SET DEFAULT nextval('public.archive_entries_id_seq'::regclass);
 A   ALTER TABLE public.archive_entries ALTER COLUMN id DROP DEFAULT;
       public          ybqbejar    false    233    232    233            �           2604    8720369 
   entries id    DEFAULT     h   ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);
 9   ALTER TABLE public.entries ALTER COLUMN id DROP DEFAULT;
       public          ybqbejar    false    227    226            �           2604    8720370    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          ybqbejar    false    229    228            *          0    10251735    activity_types 
   TABLE DATA           H   COPY public.activity_types (id, activity_id, activity_text) FROM stdin;
    public          ybqbejar    false    231   �T       ,          0    13777693    archive_entries 
   TABLE DATA           u   COPY public.archive_entries (id, auth_id, activity_type, activity_date, activity_duration, date_created) FROM stdin;
    public          ybqbejar    false    233   jU       %          0    8720333    entries 
   TABLE DATA           m   COPY public.entries (id, auth_id, activity_type, activity_date, activity_duration, date_created) FROM stdin;
    public          ybqbejar    false    226   �y       '          0    8720345    users 
   TABLE DATA           u   COPY public.users (id, auth_id, permission_level, email, first_name, last_name, graduation_year, active) FROM stdin;
    public          ybqbejar    false    228   ��       N           0    0    activity_types_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.activity_types_id_seq', 8, true);
          public          ybqbejar    false    230            O           0    0    archive_entries_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.archive_entries_id_seq', 1, false);
          public          ybqbejar    false    232            P           0    0    entries_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.entries_id_seq', 3298, true);
          public          ybqbejar    false    227            Q           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 56, true);
          public          ybqbejar    false    229            �           2606    10251745 -   activity_types activity_types_activity_id_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.activity_types
    ADD CONSTRAINT activity_types_activity_id_key UNIQUE (activity_id);
 W   ALTER TABLE ONLY public.activity_types DROP CONSTRAINT activity_types_activity_id_key;
       public            ybqbejar    false    231            �           2606    10251743 "   activity_types activity_types_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.activity_types
    ADD CONSTRAINT activity_types_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.activity_types DROP CONSTRAINT activity_types_pkey;
       public            ybqbejar    false    231            �           2606    13777705 $   archive_entries archive_entries_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.archive_entries
    ADD CONSTRAINT archive_entries_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.archive_entries DROP CONSTRAINT archive_entries_pkey;
       public            ybqbejar    false    233            �           2606    8720358    entries entries_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_pkey;
       public            ybqbejar    false    226            �           2606    8720360    users users_auth_id_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth_id_key UNIQUE (auth_id);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_auth_id_key;
       public            ybqbejar    false    228            �           2606    8720362    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            ybqbejar    false    228            �           2606    13777711 2   archive_entries archive_entries_activity_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.archive_entries
    ADD CONSTRAINT archive_entries_activity_type_fkey FOREIGN KEY (activity_type) REFERENCES public.activity_types(activity_id);
 \   ALTER TABLE ONLY public.archive_entries DROP CONSTRAINT archive_entries_activity_type_fkey;
       public          ybqbejar    false    3993    233    231            �           2606    13777706 ,   archive_entries archive_entries_auth_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.archive_entries
    ADD CONSTRAINT archive_entries_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES public.users(auth_id);
 V   ALTER TABLE ONLY public.archive_entries DROP CONSTRAINT archive_entries_auth_id_fkey;
       public          ybqbejar    false    233    3989    228            �           2606    10251746 "   entries entries_activity_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_activity_type_fkey FOREIGN KEY (activity_type) REFERENCES public.activity_types(activity_id);
 L   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_activity_type_fkey;
       public          ybqbejar    false    3993    231    226            �           2606    8720363    entries entries_auth_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES public.users(auth_id);
 F   ALTER TABLE ONLY public.entries DROP CONSTRAINT entries_auth_id_fkey;
       public          ybqbejar    false    3989    228    226            *   �   x�ʽ
�0���OqG�"�Wgt������ܒ��oo��)��ECJ(+�]�F�v�ϼ�u�
~i���8���6��R�g	a�.Y��q��ƍ6�]$P�'��Lt�ek�IR�#�J��F��#�r,�      ,      x���˒�:�E����
��D�_zb;��AGԤ{V�uN&@@v]�2�k�!>@�۷��������Ǖ~�����c��?�������}�[�m�_i���Ͽ��=�o��׿��?������m߮��y��L{�굥o�K�|k�PȬ��{�ڹ��?z����_�..���u����-��CuO��R�I�\�H�S)�\R�J���쥶Zں5$���R�b��*�@����N��9��e�����n?ҕɖ>r�����J}K�	�BzL
;k�����������[,�߁a;T
�������oq���/��\��G��4�N3�o񚧬���[ʒ�@�wE��C�;@��>�[U��7g��vao;����ס���?��������k�����>~�GN��?~v������U�'���� �L% �N?b������Rp�.sxn��}6Qt��8��k�g;N`|l��vԿ��q�J�]&�-}?7�ۖt��V:�h����p�~���׆F��h����	�e�73��+�<�ڮ��{�^�L��NY�+�m�݉P�@D���u��;��D�u8yp��)K��v�s��<��ؘ��xww�f�{=�	���M�j���]}`iב�Ҷ|]-MEJ�e:�-�rng�Z�)}s��h��Dв.w*�Esc����z���L��������uZ�;�[%��z��J�R!�����ת��UɈ��ps����?������Q��5r�a��\o��.ܡn�\�߼+Ė��Ԯ����	0hS�i����e%��_��wv�eO�|������c=�;��U�0ş�ۮN� ]3:V�KtI�Ý��w#��v��n���u��id�p(ڝfE�i�@�v#w��[�cS�0Z��I�Cd�q"�?V��-�������]Ġ�q�ȍ��3�{c��-uY�7E�VW�l�K"6�	�6I�����:������\��o����g��LX��{�3u�뾯"���:��':w:fs�K�I"��_J���U\~�?{����a��(�s����L:Mtx�3�����y_�	��r������6�?/�UM�����W�9��gfC��F�;ǉ��D�}��>'��˲c'�+	߁��c��́q~tv;��i��1T��~�ɼ�O����g�>���̃���w^6�9��F��&z�h׉/诃�v�|n�v����q�>ioG.���wR��+/w�{�?��I���]��N�e5�O��KU�=X6m�e���%龶���
�I�K�]�eN�����O���l<2�֯P�A��q�$��!���'	u�i~��NL�R�ʟfJ.�j1$�%_�G��4=���_�4�)w��\f��E٥����D��}Q����Oe�v�����RQt���(2Ѯ��v��F���b�'�>T:tܑe�G)C':�au[�BҬ
��y6���s8H���?W�> ;�:Dd�K"�KK+	w���@��ʤÇU&>��z��\O���:��HXp������c�Ƴ��ǁw>�ԗs�^�R����$�W}�ġ$��œ�UC ߞ��o�(�W�ߕ-z�.U�]�".�������!|�0h^��i�
��,"n�EN�t*Z�8կ���1��~�8�Ѻ����:�:��S�D���x�pG�mUw���uDæw	�'�� ��D�$b�kѷ��ض�	&U٧k��1���q[��Ҋ���4���b�=�p4�I�f��f}H��S��P`e�n�8��s��=U{r�^�ٹ��t�h�p����xlշ�p��k�7g�pȹ��jϠ��6g%�j��s�r�m.�֓��x�yᐥA�z��B/O��+|A�qj/�/�]��D��崢��N,�s__���C�n:x�!$��@�Ȣ�/>[__ƃ4�&�]�-it���`O���#��fF����3I�N\�2�g�z�[��d�����ľ>e�F����'�"�2��zL�G�F7E,�J��BO~�A�����D�ξ)�ghĖ{��j�ܛ���Ͳ��e��ﵒH�ײ^�v�*� ~�c�j�j�j��n�I��n ߒ⩊����n�9`.;f���ؕh��'Kpw���4���AgQțW�%�����𤘺�]�����^�H�8=��{���c���p�[4�Lo}W���/��3�L>������B�6��k�r�xѱ=���]6^g�X�����Y�r�2�!�n1���㔁�/<|Y�l�;�=ҹ�-:h�!����c9�[�G�̐(�D�-?}A�p�޼jC,5�YI�q����zt���c7vҪ�1�˲�8��s�E�x_��Ĭ����+:�7�:U?�xѣ�z�ڂ�,]"e��$b9��ӏ�$��PU�'��/�ӮfN��7﫲��r�2���v���q�w]β�g<�s>ET��G�t��<�lV8�oeJ�R�,%��o�?�X�A��umS"|�m��
ώ[	*��BC�E� ��G}���K�4�#�5�nh���h��,��SLD�����х����W�����kyY��zg]��ۯ,`�~8+]?G��'Ӌ�|2��9��; �W5�y^ҲX�������x��Ƒ��܇�N�b�o�k�z�C8�����KĜ0�K|�l�4��8U�f�|��3[��U�?�n�����un�>��@]����y_��g�{Y��cޗ�l��S��Yx]�}�����Z���.q�⇭;O���f��*`�Ζ)��~�Y�;�O?	v�/+�A��޲Bk:G��$0>�`6��SsY�� n݀�����Ktݑ}�2���9�������]���Z�pw�ZKw��h�S-߁�����p��9�b��{{�E��Z��ٱW��Ύ����p��D8P�W���_V�K|t������S�G8��*��|��%G8�]ǋ��#?]���o]���,5��Ekܽ`��z$\�|8�oݑ�dه����¨��o�l��[�p�����	㬿��H��F0]�	cT#��[[���&��2�<YY���Jր��Z�Ϡ�#���3�{�0�2ш;F�b�F�1Ґ�v�a��G#:�z�'i^�{�<sz�t�D>U�?)��c�p��6���I#�`M�n	w�-��rSo<<D#Nh������9�@7���լO��ixY�憞.m�����uw�_���!�W�p��b����ر�B#/"l5��<H��A�����F�6�^e�W�^��!���$m<�j�n���`�R�]?��<;h�M"��A#n����I���A�n��dzD�����k��x)K��kk`�Z�"��K��fJ��,%�9����eG,_K�-�g����`��>wF0�4˘j�Dn�����q4�j��]#�@�5�K�]ŭ',�q �j�-t�� 7iw\\Ү���E�Ӧ�4@��2�n�([|��q�[ý@�l5������h7�T,䊤E�g˜D��݅������2��h�{gT?�c��@�w)��!���5���-�����c~��+w�,����E˯��q�F��/	�����;Ԧ]�<����$�$�ʪnՒ�]�xGH"�2^�d0�ƪ!H,i��|�W���\��IZa��e��3[��h��=�~Z8A�Y���c����9{������>�D����i�h�k�\�h�ig�Ȱ�i nޠ��$�Y����j���$�ڝ�O4�%�{h�:�T��-�W42�i:�'c�|� :���,q�I�v���>.��g�P�����\�v��m����D�Oeg���'��<'����g�P����?RD#�V�(d�_]8�H"'Ơ�ID���i��s��8
K�1N4��EuIļx���Dlo��	Hp�d���[��k�v���������!�F���1�B�E7�Ϋ��{���kP��&^$7zپ"{R�1h�r�דެ����r�X�Z���Е��w�!����s�c˳�5N)q��e.�&	 x='E��S��f�{���    �d������:�L}^:8���k]A�A������,|���dU��>ϗW-o�%�,�hC�0'�!	�*Y:uKЈb9�	t��m!�VT���i �i*�h��=�]�����2���~�T��:Yd��$b!tiU�Mf��"	��Sd5~I ��ɑ�N�tYzB�ީex�󄁻�t��/Yz0����5b�Y3�&bH����/�.$V�(~>�ﹿ��S����b��!�h �^��FCس�������}��?Ѐ7"��n�8��5pd/b�XZ[eN$~�Ԥ?�A~�N�%U��۳˾C��Z8�1��k6�nB����
�HSǟ }(:���Y�_t8��ep�]���Eɗ��N^�ɭk`�h�hp���'[��g��
���-��)HO��%7O�|/I42�����g���g���i��c������ln<�����ܭ�n��~�Y-��R�P�υ��-H�l|u��4��Mw3�,-�BP����{#=l�:�x�Dك���{\됆qY׈����@3y�Đ��G�Rh^�ɘ�F��ֈ��5b��C#�a /L<x"�����2��G�9�UJ�_/`����\إ���^	V��E�/�V��Rf�zŎr����%���:2$Ntxl��ͯRV��_%q�w<�a��"%ϋ�]F�ש�a���n4��+%T��)�#є�7�jI{aM}E���Mc�$qm��gJ�6��J"6=���I"�5ܴH1L�^!��id$<�V�/M8'	,�ʐh�2��\lu�<�?�@�txV�':�1�����R\����I;��"��K"�e��n�yqr-D��Mx��۴,k�G�>���i�|Δ���X��*��$`c�Ș�ۀ�y����{	�L����)W�~�^{ZԦ��ዓ&�^��,�	w��B`�h����bf��ш}g�=sO���~x{��C"�fMI�ß�0�^[K�MI��8��//�NcϾ��$���'��+R䥁=����$��O	R��ElUq��%��UL	t�b��Wibp�F���F7�pW��l�r��]sz��D�CWU͉�i�e�^�0�>:6���1�Ec�3Cb�x����0�,߯��[�mt>��Fli(5�I#v��s�s�@�ʩ��"I`��U\0}I k�� �N�o�� :�(��9��.y����zge��n�q悬*�T�m��kTq��%�κX�+SKseJ��\���?*����,ˁ����]s�m໎�����&��t�"ۄ�{��.�d��M��8�qwZ.��������p~ze2D��'W6��l���h��&Y�Qf:�ܬ�{~"���g�]75�E��5��e�U��Q�����]���ia脻���?Y�ނ�$�5 ��A���
���R]Ht8��h�L�/q,��[�v�_"�����g�ӽ~u<��Oםp�`$]b��%�{�<qZ�^����࿀�%�㑹��k>��!	,�Zח^��!{d����<S���0ͅ��nᶠs�5�y�t�5�y�E���?	3�ޠ��]̚�_4{-� >?�ksos��R��%J,����ԕ:���1j�����8<�KI��s�824b��pH`���a�F��"��;�qw8\�;����ʕ4pwD�{��twH\���Aq���R�ށ#Vw���3p��4~ Vg��������~���3p���:G���]X�H�����p��ܿB��]�[��'����ϯ�GNw��p��W6M���&Qun3�����@צ�ï^�?���Kw�/q?��w3�-�^�)�l�����I�n����Kk6�X��#Vg���$�1�P�Bn�/�x�0M�z���%����}I��r�w���[���k��0Y5	�ėW[�����q���������%�3�{?݂�z��z�8�2�N��7��+?���
�h <��z��_o誻��#���i�M6��{Z�'��gcįN�i���iU�qꍇ�7>y��㎴,=�"��f4ԥk�hh�sv��g��jB�x��7N�1H��!梁?�4���-k=�ϣ�A�'�L�O����g̲q7o����$���~���S��wX����1K��z�zC#��LYw޸;
.�?���k�=�]��ĻƁ�����w��|� ���cӯ�1��<fz���Ͽ?���O5�8.6��n�ey�W	G�=q!�ƑqO��?�**/�}�G�O`h`Oh�ɳwo�xo\J��6֍�k?���qw�'�^�c�����^PU?d�>�����7T�F��Jа�#�If[���0���k\
Y���X����!�!Ndi���s�n�����j��C�D�|F�k!�4�8&%i��RU8=�<�N��sV#>�B����R$�"�u�,b��F"��%F���!��<���Z��Go)e�@�����lć��<��<�գ�;��F����H�!R�4~k �d�˄�l��qQ��Ϯ��HK�z��So�p棁�"�����L8Bm���ݽt2-��c	fT�י(���L�~�3�m�G.��}��[#��
�r �M�s���(���Զ5�a�e�]c�_�b�ć/�����y�$o<|����v�ɿ�XL����z �a�;1m�̃�ta��13dM8�H	G�_"o�E8b����p�4��$@T�"܍�bmg�+o<Q�,oKGnk��+���`���*���]��GL�i�r܀��$��L�!4�4�+�Fx�0pfi#�y���F������\Ā�~�)�S�Tvol�0~ZJKG4��η��HMC�Ƚ��H8m�ݒc�áfo�9�9 ���G��$߷v���'e8��X��ltC8a�no<����i^����4������p��a�
g9<w]u={O3����獇�x�K�RE_"��E�j���H�ch����*����/�)M���Oi
|� �:y�9 GP�-�q���e��P�nx44N�w��_�no6kr"wr"�ڑ���(�B��N��ge�D�7N�v��Lo^7��E�8ء�5�ΈuɻEo�6_��[��Y��5�u4�pa�[¼�S%�3G72�
��-�dLp��d%�8l�r�X��K._tg�k��ł3'�@-��@,��w΄>�����x�7�j����_�4L�S��<B��[�Tg���5�M��!�M5O���p����\�GL����_/��� v��5����80]O�{�������˯߅1ܝ�w��3�n�E��>N}�X�kD%f��W��e��d?�yz*��LϹjX+�#�G�OxJ�;�p�%Kz�a�k��6N:r	;��>~}�7��4:2k3�z��/�}m�����?\�'��OZ/�מ�T{�U�Q�9��Wx��Ǆ���	�I��g�&�m�����ݾ���x��8bv�e{���^��������&=�mxn�|i�eن�$��_�9^�|85�h>��_n����Ét��=�K���\���%��5��i�Փ��Lۄ���®D����xpj��6|�� ��17~hҤk�͇��T߯��w�o��m�؄��vPy��<��dZ�7�{��}��6���v�݃Ͽ�J$���9g����[�4bq�L#k�+��n<�ЄK獻�5�<0	�Lo0F�Eh��k?o9�pB�{���&g���;`�F��]��Mǹ��$�NM|�h<��pa���$d��pE�Y��4��~k��m�H�Ɓ�`���͇�/f4���������|m��T������~�X��AV���<p`�U��j0ˉ�fT}6��
Ĭ<���WOC�(n��������ĮQt���S6`u�����ay�5ܝ��8�8�m�k�Og�x�ˌã�ל��q�'#��Z�J#f���5���H2G���H��ғ�A�˛w[>G�O�Q�u�ģ��4 X  5J�ƣF9 �ǌr�mր޳�54��u�ߘ"�$<:M�o@x��W��5�ӟ�������G�Ż���N�%��E�������ˌGW��z�����6���]t�sOC��Q�h���4U!|R�#vx	;"�k	�����#!�/�g�C�A�ɀ܇Ko~ׄ}�[�Ɣ�g b	����d?��>5y(~�0�ьܟe����}��8�����O�%����eD�O0|;��K��5�_��#�/£>�g�G��⟚0|�8`w9kJ�p���4b��7P��e�`mIZ����P���ֈmW�g-�F,�B^�F,�B�m��a��Xk�_����衚N��q�N`zfn�Oy���'��Ș�
�Ɓ�1W1-�<�u�����AE��pv:����[zwS�3ig,N[�jKEl���IsEu}�����Z#>z�2�C�� �D�þ>�����Wx�u���o>�u�g��'�����t��+�0 Y}Z���R�yZa�,
Ӹ˯����7��<�!����Ez�A}othd�B>5��1�\��w��f�U��R��H<��S#z���
��q)��h�U(3�9s�f@τ=h��Y�u�/Nc���U��G��E0�N��/��8Yk���у��۱o�t��MpmS�^��%��}&>z]�}�_�3�c'0�� C#f���f}��&��>5P�䮞�x�x��u����n�Ѐrl޿.ѩC$�c��w>Db�p�H,vBؙ���φ6Db���k��?���V�?B�4���$�Lë�瘁nk��[�7��:��"1���7D����C�>q�J��!�p�b����c��-����~��ӨZ;�N<��S]z��5`m�-�xm�z��o�h�����<�ǻ>ywg.>��U�O>z��m��ç7�?�E���?�I"�蓏^=�[X���gw�u��[/OՏ��N%b�S����D�4�!��V��y:嘧Q��L�Y���N9�Py��b�҈������ЂK�N�4Tт@�8�3�k�k�,�.M�F�1�G�qk��&t&"�FP��N�y�/�ӏ�����A}��|�����V�      %      x���ɮ帮��q��\Xr#�]j�vwkP��T��×E�c�"-��H$�@~��E�%��ۯ�����{��c������U~>k)e���_�W^���e�w�����u�Wڎ=��˯�_�Q|���~m;�����3���~�'Pz��X�k��������|��?M&�Oj����S����}]��/�W:)R\�5��q�e�瞏�.�<��{oj�ٚF�5�2h��Ʋ䔏s_��u�kN�P�e����T��i���pnV���ʼ���Q��Zϯe9~����oJ|��c�O�7����c�)-����_����,N������j&�_G<Gq9���������,��2��_�|�_��Rf�����Őp��4�������/�G��"� ��#�}WD���j$\j^S>�r�˺����N~?QC�)���PC���i=:��Z	Oݩ�A]q �������xw$|�%GF«�}�+`в�.|_bs�[#-\#-M#�{��˻Sj�;
�u`�cf�z�
��4�B�T��ASn��[�8��R��C:�H�SLn?|3��f��ɝ�Y�k�ݹ��go-�?�%�_DR?A��c�`E��@��/x�<�64A`mh���~����E��YG�NO�l�g=]������-V�S��l���\#�saUXV�-rl�ܸIC�����-~XV��&�����Ƒ���{Ǖi:��e��!�]I&1�u��B��c�"�����E�����Lz������U�u��}|�o�b�9�X�U��M��4��{��߬�Y6�D�	��*���D\���6�w'�$:b,~6�c��V�7mQ�Q7�EL׈vNE,�ң��GˬfC�YeVސ!�Z]��Ik���ǁ�-o�
�k����K��I����g�&>�j��(���,�0��ީ8���n���y;��kk���ה_Ge��gah��a��=�9�%���L�c�U������r��#o��l%�wCdI�~�ǆ�m��Ź��d})��-��W,����e��������'�qY��W����� �8��x�C����.����^��R���\����z|��~�	� ����������rە=+�i�P�e_c5����Ȣ� rZ���A]H�O��f�c�����i��� ���q�b�%t�lU"���씉��f۵�ֹδG����^|�M#x�x=�Fl�,&��-�%�0~�Fl�%��D�y�������z���}����'o?%�ׯ��/���^�uѸ���u�*�C]��s;���y\S7�Xܭ��R���ަ<��1��[��";9��柈ĆLG3M���v�R���ǎ�3���ƭ��>�k��]�����~��$^��^���us�w1=@<v��g�[;��5�;B�9ꨁ����4�m�g/>���� �+��Y�\��L�º���<˲�X����u�)�����ܠ��� ���'��i��8��{�v��߯k�=��+�י^�����~x�������I�	T>��+P�����ŏ�����7]z��w]K_�NU~��u��kuW�ǬNć�ή�kv�ڇ��,}s�nZ�6;��\������*3;�cf�z�������0�S�cV7���Y��wV�cV�p����w���t�����Y��Zݼt���������(-r`^8"���#�<�`'6"�P-�J��C�Z�尃!
-0J�B/�Ph��Ph��Ph��l��lᘇ�N��y�mw^���B�8i�KGC�ƥ��q���CY��^�ls�e�AsPܛ#��M$��`>;"�+,.Pp�5�8������>�C^���ڏ�\�ç�ʤ:-P��y����h׈��o�5�;��h'�5斘�H5b��\�M�_�W�״���??�Gj�vr�cn-�⨘Sw+TT��(f��l�KI�'����VE�1Ӭ��t��ֆ���s|�;�����Y�c#��&��:�}�L<�}�l<�Cf�����C������b�Ƒ-�8S�8��Ib-���f:7]������u��-��{~��naV�u
����5`k�&�z����I�=
��P<`��cWͼP��y���jF�;g^x���`+Q��]2f�m�Y�x��q�Cx8��WV7�O4^��A�H祑�>�����c��"*/�no��w8���(����2�n L~�Ć��/_U/��/�����a�E����7��*3�ŗ���>����p�j<�n�)��"~x�Î܄�o��ӳ�$�}��_�;z�݂<ϡ	;z�c��f��o��]����1���5j��<hmx�\ĵs	��%��p��ܺZ�e��7A�×0YCt�8M����u��d?J��i�-��@6���ц�솈>etDCD��#R=q;"�!�׏�H5D��I�_8�n,?i���q<�wix���Z�@:���o�;��$�qdg-�#;�KGv֧.�Y�S��Nay�s�O`g�U����E�����i��IZ���I�Z|a��v�:������W-��_�z^>_�}^.�� ���U㧇?<��x�6�. .�;���'U����;T��(=k|J?5l]���w<�4��f�(����űb�/5v'�<����XY��c�4���2ZX��.�&��Q�Ӏ��U�K��������$��#^ �W�p4�E$M�E�Ü�iPh���͚�g��>��ۓ��T����+��خ��BXX���L�Y�۷\gr�eQ:�I��i9�p�H�ICo��Uk�V�o��@7�yW���2=�Y��Ni�`"1G${J<����r�y68ӱp�L'��N�u1o�>E�C��v�6�)+�r�vʗ���2��Ny��v���j�)_��:d�\��n8<�N1���t[@��۾y ��?�w#��Ï��p�����x8��>D�t���>���N�����n���u�;�S6���]�C��?(����k����o�XP�=�X�;�)��W�!bJo������p,��)�k�7-��k�����:o8�Yٓ%7�n�E'�c���86�:%f��/�o>vٗx��Osn�XN!2�sq� ���uhg,�%��]�OA�m�V���4����~��y�j��x8���A����#<|l� 1 �B9Dd��Wۜ!W(|b�qdaXE��_�Ȯ[F����~DM ���#d���ؽr�t�#��%,ǈiFFưY����,ǈ���W��zgO{���٢t1�o�;�I`^��sNE�V鼙��s������� ;5v���&ڥ�Y��΋�Ŧy�'53+��;O��WqD0�0뷬��Z�3·˿��_G��+�9~ C��,�Z��q���s������fE�ŷ���m�Ӓ�ь	w�jD�5Jӈ�7<w�`��_�4����:�^�����5���<Z�����W���Ë�Ç7v߿ƀ"� �W`2(roC��E�ć�:��x���������M?���� ��幉o���>�Ϯ��G$�����3���q\ÁS�������q�C�l�J�e��.[qlɈWqD�^�ύ#b4ǸQ������+O�h�~�����]3�ӄ񀋣��̿by<L9~�J͓���T~�J���pRc:K�a�������Ò�x�A��7���p(�Zk�FR=��;���!��ί�-�ܿ�0@"�4��"����Q�*r��+�XbT$����c��]��OC��:p��0ڂ�q��`)Il;���ѐ
�N�h�V�~�6�o��M��p=PG|�aV�����(�n�*9�1~@7��T�a��x���g�o��q��f y��b� �ٻ��NN��;N%���Z�l`�.�e�yL�U��,s,l�ֈ��B���Zz�Z��u���g����=����׿��`�w���:��#>}�w���F���O�r��k�ǝ��_CN8���:��;?�ĝw/�Ǣ�#7�?����	�/����t�q�Kw3�=�w��Ǳ���;�6    �f�	�=Dڍ[�5r|.M�[)�#��S��n����{ʀw����OHx���C�g�y��p���0�Cd���)�-�Q#8e��vi�1�4��iZ��A�l�ֆ>C'�m̪ Ϋ�F��p�j�w++���07�^0o�^�ej����h�}0��t��Y���zk=Gp� ��eQ�u�݃��;��Iu�Ż'����G�R�G�O���M��_j�"8L���A����!(O�3߷�ZFP�kK���Up��c��"��o��˹ҵ40�f��h��I�6�<��e|�;�Q���tǁ��o�s�V"w⍻�ǺNn�����$�F�$q���{$,�+]����_�Ox��#�[�
�py�td$4J���m�8��jရkY�j \�A�G� F߅��h���\xq��w�w/���N�+7�]7��A�p7���	gK�?<��tIv�~�i5�'fPs�����|�~=X�3�P9�k���՜��.-=�#��f��H�	G��B�bly�_���<.w��e���[&���e���[n�q�̺����q�6n�'�����p���w'��~w���w'��~w��!w�x�Dx8�Nm�/<�W�+��w��8}��A�G�������'<�p]�9���!�=w~4�ïC2W���<���x�x~��w��Vy�E<�n��1�*�X����}���ko)�D��`},��O��#;^���K�K���a�X\]�|��Eb	�"���9��*b<�⊨� ֘�-T�W��XD��][LS<���u@Kǜ�H��<G{����0�.��C� ����Ս�{��;xOg�M�y�E���z��	�k�ުC7�ꭚ����ӌ�㮁��I���;D2�.��ݒ��{9��o�\��x,�sނX��\���3�Mc�CW����#��Kr$���|T$>vW"D��J�5b�Q�끽nk��Ƣ
�Н<��=r����p�sk0Ӛ�jܽ5^y������ϋ���ƌO�?܋���摛㢺	(�2KR���|l,�ٛ��M+��ǈ��$N�;�]��,2�t���<-��붗���v��I�8`�9�Y�h"hJS$�H��:���p�8pz���]�^]9�\gq�qwY8/�t��L��_=��ӝ��a���uZH�_G\oQ�摼���_���kN��ꁷ�=ܸ,S�E�|A[^�T�N�	�E�@f$���q@���#�'Rt1>�x���0>�c����DbdG��4E�xNSĽ�sx �����ԙ�{���@L�a�9��K~Vyq7%N%`��*ۤ%ۤ%�ؤ��ܻ�a��"1GGMjh���F���L^�H�����&Ü���s���ww�~x��s���>�sX��I�MH:<~�ć��8Ļy7~�����Q^��Y��CI���jp���_��k�u�x\B$� ��7�"�p��F�{�8�u�,�]�[�7?~3+�{1j��Z8�u>���	5��ۀ��F�77��y�D��~�i=ptmU�=�NS�u������6�r���e���M�l|�p?5����-��/���\��ĻN_�G�Ļ^_��]�/�w���u�z^��%�&�{>�m��&�3?/%<��}���f/�<�c6xT]�e�cx�k�~��*��_���d��xd���Wp#��Y�y��mG%�D�\M�.۲.M��v��`_Sǁ PiGǞj�nA�f������k��+ ��nKǁՠ��n��]z������?v�)�Ѩ�W�݃C��K{/����j���Sn���e�f7�z����F7����K��#��S�@�#����we����+bw��ǎ�H�zkĆ���J#vp��n,��UhiO/]��'�<�@V�|7���o2�.���`��e��ōx�v�y ��Y~��;9��8j�@ �0
��Učq��b�]����Ox8�����j�i���8l����Kwg^�o�mHV�!>���Ğ�f��.�1��b l��[�רc[b sױk�8�v�=��n0�R�~��8�����Kc)CW���h"�P���p �����m¶����$, �n �(��|�`/⑈���m#�0V!|jh�|0~�)MDo�-�x����EKCT��a��"�޸����+	�.����)Zp6��X9����fy�Θ7���;ch^?{2uWQ?%i`9�F�P��c�����m� [8}C�8KKj}�nl�c7N�e���9�(��%��nZ����W�j�&<M��_%ە_%�����v��Y\�$Mx8������q�_�����K|���������O�xiiXW[#v��<|�]sB�5bkG�#ht�h��vL�X;vw�u�F<�����<�=�g���#���_��֫q�2_*� �Xv�mZ��6{�t�h�%i?oK8���_��q��Ñf��-O��F�/���Q�5��_�l��F�6���O7�Eb�X����o�r><����*������<unx�/��]�����p8���Ѣt>I��`/"�����`/"٭���p��E׋*T��-��zѓ�C x�4*�w*�
t�}���l�p~X�ˈc�yo��\�6YE8����
~��(o!g��ӆ�,���O��Q���ej�$<�)��ùG춻�;���}�����~���Wx8NL��s�kVE[������	.d,<|=��p�zZ��눻�ӏfKx�z���7��N�{���pw��>�E~4�_�(gV����7.��H7�|p~�224��Kv[���Ј�S�z�`o�=5�>}k����4��z�_�)�G�N5�>E4�/��������G�}����"��QN7����>��͋��Dܙy�9���,;�p��%����إW�W���[���F�i�����[_"i��A��{��-p�hi�y��9z���o	P�����$��և�P�h����qS@x8�T-�w��WW���~�;��R��pi�g_RS�ù��ʒ�p��~1�4��f��Mq�fS�!��7d`�}��}��	g>4�ֈYq"��p�[ rJ��g���ENwvxw(~�%N�؋�#�N�\
�Hl{�"/�I�tNZ��R_7i����'N����s����\��mRӨ171q��4bnb�Di��iW�tY�F�@�#��4`;5�;Gݧ���o���Q	O�g���J߃.B��1/�4���������WY�c���b����"&d��'�e9�yl�nY��"��b0K�*�>��&~�����7�R=@8pΝŒ��d�'䜻��;�{���KO#���KulA,z�g|17T!5<
�{�������wn.��������k��4��"����5�i��t���ot��IW$��L\c����^f:��0Y���H=^�!�݈�q�B,i��HKO ���w�7�]$��舸Nd˓m���8긛��t� h�o�#ՏH8p4��#AU��AЩ�p�q���p1=���?�ⷆ#珧�ù#T��F�<��G�]�}Gǁh�tj�vIU�@�K^4D��7D��S\�uwI"޿���#����ܷ����8�@����G���L_ǹ8�����2���Yu獰qwҝ��N��Ǐ�@�.�2�2k��O���F���@=f���Np��E��#�4�9�܈�?<�qr �&��S1���a���x�M�G H%fᮣ"k�8��8r�c�@d������������Q�8[~�^%\K�����Q>R�ʽ������
�Y��5_5� \w]���.�����a.^5��q�h+?�E����Ю�P������T�6�fk�X\����x�5{0���)��b5M���x�yǂy�fxi�����q�틧��q����^��Kx���H$�Yf�0U����EH�p�4S4��ξ�]y6ޝ~�]�9<�gh>��O�#c�нɩ��T    8 ���'vW��d���9����YX;��f�k ��P����*-�#h�������L�qd(���9��4�A�q�z��G�O�m��#�9�A�q��9[�1��'kj�鉍G��3���x<��:�n<��?w7O+������[�ݍ��?z�c�DNJ�g�zR���G���?~k`Y;m�X
�1�y�Y��z[;�|��	�˧Ȏ~��%���3ҝ���[c�t�k�}����G�[#��4N�q`�^ȁ����%�"[�z����4P/XK#�^3׀�k�ֈ٩�~�50�S�¾5b�5Bc���)s,�Y�em�{U±��F��4�xg[���X�[[g��6j�.�d[�|�5,	��A�mԨ��"�W�� F�
'6Rv{R������a�p �����o,���{�g��_o�k�����j8C<���&�5=^���e�twY9/�mun��aD��inP=_<<Oq�y��ۮ*~�@�^����y�pxc��Q�4�����bk`�f�@$�`�G��ӟ��8����]�׍ۂ���ϧx��7�<�ru]a�X�����#�Ty��	w�W���UN�n׍���T�N��~*]:�,b-H�3G��؂�#�|;/ܿj�S<�bc���;/�z�(�z%��ؗ�H5bǏB�5��G�z�<�bx�,��]��Qk�S2�(����GvM[��a������_"�:5��,��a�l��"�u�f?ߡ�k���_w��Sx�qg�16|g0>�'%{/[8�1���;���Q�kv?���3p����5E���G�'T���o���<L��u<���ى��"̳��Ȋ���IHT�S����o��᧜O�L�Ɓ����ߝp���þ'e^�p�|�O����aϛ�%:Y�?i��7̶i�]��qo����'�W�߰��>���p޹nx��m�}��gC�;�>�􄇟�9E���x	�$>E�����x��*����~�⫭#L�i�kܖ��d���*��ص���H��S&@�����]/�"1�o�J�i˦5�$K�HLtk��҉�Px;`/�;�s� K�z�m_t
0O�ht%���D�@��"�/S�t�q�p����
�R���GFF���R�+���h���Jpӥ��wi��p�� 	���]��O�#Vw�F{�w#su��p�x�����pK t/G6!�G,7�CMb�ڝ��M�I�����Y,[s�Ru��N�d�7�_�����H��uO\sR��SG�8����r��7�F�8�8F��������y=��d��������_���٦��)~�u(=C�`��c����<��5�S8�t��M�5��k9�u<�W��5����^�ێ���XK9p��,T�	�da���a^5xig��n�w'reb��^Z���ȳӿ2#��׈G�n�Żf������C�޿4ɼ���x��0�|,ᡲ��4�\r�I�w�,�4b�������aU�eg�=E �#�qeY#o��HOr�wd:6p��G��_G�xӠ�igq؂�N�.����<�^#k�q�L;s|q�H{}:��<b�bB8r�"M���p���M��"�8`xܥ�]O<p�b��L\����|��x]�V��1����뿗���O������nƍ#&�.Co�,\���@��dQz[��g�o�n���*�Hx[��s��a�M:���ۑ*�K+�f����(�$��<���L��_�a{T��7s�����#:"إ
��L�h�Qb>^�v�hk��h��������#�-W��|���r��7���p���,M�m�>?�X�G��z���JTV���1o׹b�� {m\k���҆�Ǧi�#FXĸ�����٬0��M�7���-��3L�0��U���2�ۈ�=o����|�ئ����Oa�e��;�v��#����W���;��_�x�����cı�#U8 ��+|�Fx�L�(~��xw�"�<�a��q"#<�C�Ɖ��a�W��'Hx���{��pʺ�20����Nu(c��;[{�
W�[�}ck ��$��k�_W�-<|lC8��;�4W��z��&%��pox��2e�G�Ï��_��𩍍�CNT�	&�k����|�j�`�%�ܞ�4��!�VD�N9��pd@���}X7d@�>�y�F�"��4\_���
���U��NKw�B��N�iV~�#���ƑP�m7�cU��xk`�FlZ��!H#6-�5�g�s�]��r���U�A�4�d2>5�X�\w>�R��7���rc�yw?�*����ֈ�M��t�U��U�׫���4�w�]
���0�и{@��M���L~�z�1�F��k�������ښ� +�"�����3GV�U���$�Eas���Y�50�BeK����T�Wɽ��D]��P���k�p3�50��*\o,r�
��[=�����=|P���o�� ����Fi�s�F�r�$�=�Yy/�ڷ5J�o�qwϜ9��x8�M�/�x��FY2���8.����8�N�;2r���:���u��.��)��GGU�w���u>u偣�|�k��cv��ƄcO*��.M#6>�b��rW��tk`9_md�^yw��e��Ρ�\$�D��� ��p��7La?�*<�n<�W��ՍCV��`��jPs׸��GJ�ڨw��4 �/[#G z3�>�eO�<�(��D6(�דHl�
���lM$v��D�I�/*����q"���>�
��|Ż��E�?��\^�(������u3��G8���	��:�х��GL�&X�⬼���9$@�r�W`P:E�S�#6dL�������lhOIk@��u�]#v�3�t��P��݀,���Ff?6%��ه�q�L{{�5	?�8�������=��߷+<kܝ��j<z�� 1�6����,S<��Հ]T��a{4,��t�!/���F�t4����\õ?��G�O���8���ۂ҈�'��F�<�ѨH:O��4i����S]�6;�ܜ>�6�,��w�1���=�!@��s�/������w�CV<�"��g�?��W�W����뻼R����K���\��k��o�{o��}�8����S1k�*��MG
���:M��m(�L�l�?�tK�x�[�v�t��P�زp^7~��q貹k�������5�e�@r�X�t���<ӶT`�����q��!s\���##�z�"�Q�虢���*'��K�K�3�Py�c�zL�$i@��4���m��c[�RA����^fJҀ��|A��s�*�Fl�(=�>�@нC�X���C�som�ɏ`Y���Y�xd��O���'���ar���xw�\�>-��8�4ő�K�x4%]�<��;��'�=U\�<�~,�G�Z�l��6<z�׀S��K?D�M��KW�+��+<��K��~lБ72�w޽Qy�\����/�o�g�b�ge:~�/��]W?��M�߮lӊ��ȵM�@�m���5�i���������[��yx�iEbn�"�4��:�!,�}�%R�շ-�>�Ҁ��ۨ�޶����-Q�qn���6����\���JgJ���a��}���Y��Co����E���;"��2���D>iw=�)7���=w$�ѫ��;��s��[O�yR����T�c�iG$��vDܷ��8O�HKy=8� _�e���tl�jvZq��x�p�p*������5E�
�c�}?�e�4�m��Y��Z*N��H���f�0'��"�l��΋;dz�p�L�/ܻj��i��龎����y�c��ٯ������r+P<���{��.S�y߯�������InX����U�Gz�����G�H��8Y���48���:���{�O��O܉�x�k㱛��������$�&��[dԀ�(�ۨe�xjvA��O�-/.��mw��S�E����ߦƼn��"1ku��/{�(��C��o�Ϳ�M�d�����������$.;����w\|c�Gc�{�ױ���Yj}� �  0�7<f��=x4����#����~�n���և���f��]�>�ќ�_�����e��pr��x�	�w�.���)eD��_d`��`����`ׅI���#ku�cԈS��=J"�9e_���vN���]m3�M7'���}��n�Dv�#j���W1V�F4�Kϗ��=.������Qe�U����d��=���9&�W>~[���i�Q��	�Q2"��c�yf�-P�*5fK1��������<�����;�,��G�����:φ����h$+ܖ	߀�cJ��k�L��1�p��@gnK�7����80�0�w���ц��>�҇SU{��ZC�	n܂Gܸ�q~>��l�&Y���̨<Z��@G���H#f�sxyj���٬H�H���9G���#���"�y{nh:�ƙ����k�"���?��[oSz4�I=2����ļʝ_'v����b}��OD�79�D\61>�p`�i�ǳ�yt_�65.��8��&�|����g-02�	�į�K'�u��KL��Q8b�x����G��U�nN �XWx8'���	G�b��qd�i���< m��v�&,5�Ώ(;�.5W��^�pJܛt���#��M�"�(˛�D��.�	��wap`���q\��~J��d�-�5�9�V�޻���_��׿�?D��      '   �  x��W�n�F}n}E~ D�/o�c�A6�+�X��l�P���v��=՜G���C����ϩ:U�����n��:�&x�����)%��,�i?��S���.v}������?)�$���wZ\��7��,��D�mHZ�	p�?�\�Rz��6�ݾ�B�j�6�oH��H�)�����*��l�s(.rn�k�T�`�cLO�����
��%���AZ�T��8n���H��w���`��J8����*��n��었8k�4_���6� B�(ULm��H�I�"�^|z�m�ܴm�5��S+	d��8���S��g�1���H����7�s9:f��!�E�&e� Y��0�/8]���H����a)�6�sktl�n���������8z�w�'�����f��9��l�pыMC�����j3N�8�o��L��HZ~(��K�����@h�T�Zw�� ��>�"�e? L�`���Vx+Q]�YE���h�&v�k�8�C���KI�K��j{#ic��"�l��1~�CU��{���?q��h],�\i���,�`��<U�K��8]��c��i��|�.�8�#t�B��񧨁�&_�K��{�Ǔ]���r��K��XF�� �V��!X6ʈ:/&H���oQߟ��|w�Bqj( >MKPJؚ	�������a7yH�žd����8Ka��`%�Ny���^K�\�����w��]�!4!/�9A0tmШ,G��,O]z�j��d�]��\`�da���� Zte"OAsL�:O�LoY@	���!q�v�S���(�,#]���/�8�}�M�
�3�[O}��{�'�;��v�X���:޼w_ȞS�sM�^��ا����5h��d-��y'�v���B��'��T%��ƃ2�l��7S׶�Pa~3������$ٛc�<���N���9!��s��֏�}��^����W}(o ��״R-��hJb����f��<N��̡PM�7�y��A{������a�U�v�+J��x�Mq;0�{��6X�%w0�T�x�hTC�����_.)vLQ����j|��u�ĩGΒ�EPZO�#c{��]q�3���]����yQ�:q�iC��ǝ�A��K�f��pI���;��M/�Fsr���-c���;�W��ݫM����c��}-���M�r�<,�K%��W�[\�}�P�Z-�����֠�6��r��p.m���7�W��Z�2�h�I�/�0�ͼ�����C�LX�$m����B`�;�N�]��R��*��͵��	`�9��-󮎂W��W��[RK��\cyc�C�⤓6����}��=������^��Q�`�y�%����q�ߘ��ԍ+*�������M�Ty-l+��&����e3aNWCq��ċ�[��(I���2���^��=
6>��8N�O������mj\�pĻ��6�n�zP�
����}x�Fխ?z!P�u�y(�����W`�\Q�l�J4����8}��P�fү�>���'�����ܷ�6t�J/����9Zx�U�Q�.#S�a�O�e��%{��!�c�+}��ݥt4{��^�t�+�}�R_>���C���RUx�KQ���JTC6�����~Gw�Ò>mB�ov��F�Ɋi�����o�gN��<{[��Z�������`�.�Z��Uwww�!�p�     